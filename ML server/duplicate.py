from flask import Flask, request, jsonify
import cv2
from skimage.metrics import structural_similarity as ssim
import requests
import os
import base64

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'


@app.route('/match', methods=['POST'])
def match():
    variable_name = request.get_json()
    img_data1 = variable_name['img1'] 
    # Get the buffer data of the second image
    img_data2 = variable_name['img2']
    # Read the images from the buffer data
    img_data = requests.get(img_data1).content
    with open('image_name1.jpg', 'wb') as handler:
        handler.write(img_data)
    img_data = requests.get(img_data2).content
    with open('image_name2.jpg', 'wb') as handler:
        handler.write(img_data)
    result=imagecheck("image_name1.jpg","image_name2.jpg")
    os.remove("image_name1.jpg")
    os.remove("image_name2.jpg")
    return result

@app.route('/match1', methods=['POST'])
def match1():
    variable_name = request.get_json()
    img_data1 = base64.b64decode((variable_name['img1']))
    # Get the buffer data of the second image
    img_data2 = base64.b64decode((variable_name['img2']))
    # Read the images from the buffer data
    with open('image_name1.jpg', 'wb') as handler:
        handler.write(img_data1)
    
    with open('image_name2.jpg', 'wb') as handler:
        handler.write(img_data2)

    result=imagecheck("image_name1.jpg","image_name2.jpg")
    os.remove("image_name1.jpg")
    os.remove("image_name2.jpg")
    return result


def imagecheck(path1,path2) : 
    img1 = cv2.imread(path1)
    img2 = cv2.imread(path2)
    # Turn images to grayscale
    img1 = cv2.cvtColor(img1, cv2.COLOR_BGR2GRAY)
    img2 = cv2.cvtColor(img2, cv2.COLOR_BGR2GRAY)
    # Resize images for comparison
    img1 = cv2.resize(img1, (300, 300))
    img2 = cv2.resize(img2, (300, 300))
    # Calculate similarity value
    similarity_value = "{:.2f}".format(ssim(img1, img2)*100)
    similarity = float(similarity_value)
    # Create the result dictionary
    result = {
        "similarity": similarity
    }
    # Return the result as a JSON object
    return jsonify(result)

if __name__ == '__main__':
    app.run(host="localhost", port=6000, debug=True)