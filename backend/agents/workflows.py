import os
import requests
from langchain_core.messages import HumanMessage, SystemMessage
from langgraph.graph import MessageGraph

def call_llm(messages, nvidia_key=None):
    groq_key = os.getenv("GROQ_API_KEY")
    if not nvidia_key:
        nvidia_key = os.getenv("NVIDIA_API_KEY")
    
    # Format messages for standard OpenAI format
    formatted_msgs = []
    for m in messages:
        if isinstance(m, SystemMessage):
            formatted_msgs.append({"role": "system", "content": m.content})
        elif isinstance(m, HumanMessage):
            formatted_msgs.append({"role": "user", "content": m.content})
        else:
            formatted_msgs.append({"role": "assistant", "content": m.content})
            
    if groq_key and groq_key != "your-groq-api-key":
        # Call Groq API
        headers = {"Authorization": f"Bearer {groq_key}", "Content-Type": "application/json"}
        payload = {"model": "llama-3.1-8b-instant", "messages": formatted_msgs}
        resp = requests.post("https://api.groq.com/openai/v1/chat/completions", headers=headers, json=payload)
        if resp.status_code == 200:
            return resp.json()["choices"][0]["message"]["content"]
        else:
            raise Exception(f"Groq API Error: {resp.text}")
    else:
        # Fallback to Nvidia NIM
        if not nvidia_key or nvidia_key == "your-nvidia-api-key":
            raise Exception("No API keys found. Please configure the Nvidia NIM API Key in Settings.")
        
        headers = {"Authorization": f"Bearer {nvidia_key}", "Content-Type": "application/json"}
        payload = {"model": "meta/llama-3.1-8b-instruct", "messages": formatted_msgs}
        resp = requests.post("https://integrate.api.nvidia.com/v1/chat/completions", headers=headers, json=payload)
        if resp.status_code == 200:
            return resp.json()["choices"][0]["message"]["content"]
        else:
            raise Exception(f"Nvidia NIM API Error: {resp.text}")

def invoke_agent(agent_type: str, user_input: str, history: list = None, nvidia_key: str = None):
    if history is None:
        history = []
    
    prompt = AGENT_PROMPTS.get(agent_type, AGENT_PROMPTS["chat"])
    
    # Inject RAG context if this is the RAG agent
    if agent_type == 'rag':
        try:
            from rag.views import RAG_CONTEXT_STORE
            prompt += f"\n\nContext:\n{RAG_CONTEXT_STORE}"
        except ImportError:
            pass

    def generate(messages):
        if not any(isinstance(m, SystemMessage) for m in messages):
            messages = [SystemMessage(content=prompt)] + messages
        response_text = call_llm(messages, nvidia_key=nvidia_key)
        return HumanMessage(content=response_text)

    graph = MessageGraph()
    graph.add_node("generator", generate)
    graph.set_entry_point("generator")
    graph.set_finish_point("generator")
    workflow = graph.compile()
    
    messages = [HumanMessage(content=msg['content']) if msg['role'] == 'user' else SystemMessage(content=msg['content']) for msg in history]
    messages.append(HumanMessage(content=user_input))

    result = workflow.invoke(messages)
    return result[-1].content

AGENT_PROMPTS = {
    "research": "You are a Research Agent. Your goal is to find deep, factual, and comprehensive information about the user's topic.",
    "coding": "You are a Coding Agent. You write clean, scalable, and well-documented code. You also review code and find bugs.",
    "content": "You are a Content Agent. You write high-quality, engaging content and articles.",
    "automation": "You are an Automation Agent. You help users automate their repetitive tasks and create workflows.",
    "rag": "You are a RAG Agent. You answer questions strictly based on the provided document context.",
    "chat": "You are a helpful AI assistant."
}


