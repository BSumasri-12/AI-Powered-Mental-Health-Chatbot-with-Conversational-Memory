from langchain_community.llms import Ollama
from langchain.chains import ConversationChain
from langchain.memory import ConversationBufferMemory

# Initialize Ollama LLM
llm = Ollama(
    model="llama3",
    base_url="http://localhost:11434",
    temperature=0.7
)

# Store per-user sessions
session_memory_map = {}

def get_response(session_id: str, user_query: str) -> str:
    if session_id not in session_memory_map:
        memory = ConversationBufferMemory()
        session_memory_map[session_id] = ConversationChain(
            llm=llm,
            memory=memory,
            verbose=True
        )

    conversation = session_memory_map[session_id]
    return conversation.predict(input=user_query)

"""
import ollama

# simple in-memory conversation store
memory = {}

def get_response(session_id: str, user_query: str) -> str:
    if session_id not in memory:
        memory[session_id] = []

    memory[session_id].append({"role": "user", "content": user_query})

    response = ollama.chat(
        model="llama3",
        messages=memory[session_id]
    )

    assistant_reply = response["message"]["content"]
    memory[session_id].append({"role": "assistant", "content": assistant_reply})

    return assistant_reply

"""