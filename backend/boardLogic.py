
import fastapi
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import random
import uvicorn
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI!"}
@app.get("/getWords")
async def select_and_remove_words():
    """
    Selects a random word from 'list1' and a word from 'list2' with the same index,
    and removes those words from both lists.
    
    Args:
        list1 (list): First list of words.
        list2 (list): Second list of words.
    
    Returns:
        tuple: A tuple containing the selected words from both lists.
    """
    if len(list1) != len(list2):
        raise ValueError("Both lists must have the same length.")
    if not list1:
        selected_word1 = "We ran out of words"
        selected_word2 = "Why we need to stop playing"
        return selected_word1, selected_word2
    
    # Select a random index
    selected_index = random.randint(0, len(list1) - 1)
    
    # Get the words at the selected index
    selected_word1 = list1[selected_index]
    selected_word2 = list2[selected_index]
    returnList = [selected_word1, selected_word2]
    # Remove the selected words from both lists
    list1.pop(selected_index)
    list2.pop(selected_index)
    
    return selected_word1, selected_word2
# Example usage:
list1 = ["A day on the boat", "Wheel of Fortune", "Jacob Pohl"]
list2 = ["Fun things to do", "games", "People"]

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)



