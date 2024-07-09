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
    if not list2:
        selected_word1 = "We ran out of words"
        selected_word2 = "Why we need to stop playing"
        return selected_word1, selected_word2

    if not list1:
        raise ValueError("Both lists must have the same length.")

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
list2 = [
    "Catchphrases", "Catchphrases", "Catchphrases", "Catchphrases", "Catchphrases", "Catchphrases", "Catchphrases", "Catchphrases", "Catchphrases", "Catchphrases",
    "What am I doing?", "What am I doing?", "What am I doing?", "What am I doing?", "What am I doing?", "What am I doing?", "What am I doing?", "What am I doing?", "What am I doing?", "What am I doing?",
    "Where am I going?", "Where am I going?", "Where am I going?", "Where am I going?", "Where am I going?", "Where am I going?", "Where am I going?", "Where am I going?", "Where am I going?", "Where am I going?",
    "Food and Drink", "Food and Drink", "Food and Drink", "Food and Drink", "Food and Drink", "Food and Drink", "Food and Drink", "Food and Drink", "Food and Drink", "Food and Drink",
    "Greek Mythology", "Greek Mythology", "Greek Mythology", "Greek Mythology", "Greek Mythology", "Greek Mythology", "Greek Mythology", "Greek Mythology", "Greek Mythology", "Greek Mythology",
    "Stereotypical Curse Words", "Stereotypical Curse Words", "Stereotypical Curse Words", "Stereotypical Curse Words", "Stereotypical Curse Words", "Stereotypical Curse Words", "Stereotypical Curse Words", "Stereotypical Curse Words", "Stereotypical Curse Words", "Stereotypical Curse Words",
    "Song Titles", "Song Titles", "Song Titles", "Song Titles", "Song Titles", "Song Titles", "Song Titles", "Song Titles", "Song Titles", "Song Titles"
]

list1 = [
    "Break a leg", "Piece of cake", "Time flies", "Blessing in disguise", "Hit the hay", "Under the weather", "Let the cat out of the bag", "Spill the beans", "The early bird catches the worm", "Once in a blue moon",
    "Baking a cake", "Writing a letter", "Planting a garden", "Riding a bicycle", "Painting a picture", "Cooking dinner", "Reading a book", "Walking the dog", "Cleaning the house", "Watching a movie",
    "To the grocery store", "On a road trip", "To the beach", "To the airport", "To the library", "To the gym", "On a hike", "To a concert", "To a restaurant", "To a friend's house",
    "Spaghetti and meatballs", "Chocolate chip cookies", "Caesar salad", "Grilled cheese sandwich", "Strawberry smoothie", "Cheeseburger and fries", "Pepperoni pizza", "Chicken noodle soup", "Ice cream sundae", "Fish and chips",
    "The Labyrinth of Minos", "Pandora's box", "The Golden Fleece", "Mount Olympus", "The Trojan Horse", "The River Styx", "The Oracle of Delphi", "Hercules' twelve labors", "The winged sandals of Hermes", "The shield of Achilles",
    "Bloody hell", "Son of a gun", "Damn it", "Holy crap", "Bite me", "Screw you", "For Pete's sake", "Shove it", "Kiss my grits", "Heck no",
    "Hotel California", "Bohemian Rhapsody", "Stairway to Heaven", "Sweet Child O' Mine", "Like a Rolling Stone", "Imagine", "Smells Like Teen Spirit", "Hey Jude", "Billie Jean", "Wonderwall"
]

# if __name__ == "__main__":
#     uvicorn.run(app, host="0.0.0.0", port=8000)
