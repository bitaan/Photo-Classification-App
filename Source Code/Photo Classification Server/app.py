import io
import os

from flask import Flask, request, jsonify
import base64, random
from mnist_mentium_classifier.classification import MnistClassifier
import cv2
from PIL import Image


# file_name = "abc.png"
# file_path = os.path.join(os.getcwd(),file_name)
# # img = Image.open(io.BytesIO(base64.decodebytes(bytes(img_data, "utf-8"))))
# # img.save(file_path)
# img = cv2.imread('number_1.jpg', cv2.IMREAD_UNCHANGED)
# # resized = cv2.resize(img, (56, 56), interpolation=cv2.INTER_AREA)
# resized = img
#
app = Flask(__name__)
#
# clf = MnistClassifier()
# print(clf.classify(resized))

@app.route("/")
def hello_world():
    return jsonify({"Server":"Successsa"})

@app.route('/save_image', methods=['POST'])
def post():
    print("request")
    payload = request.get_json(force=True)
    # print(payload)
    category = payload.get("category")
    img_data = payload.get("image")
    img = Image.open(io.BytesIO(base64.decodebytes(bytes(img_data, "utf-8"))))
    img.save("abc.png")
    # print(img_data)
    file_name = "abc.png"
    file_path = os.path.join(os.getcwd(), file_name)
    img = cv2.imread('abc.png', cv2.IMREAD_UNCHANGED)
    resized = img
    clf = MnistClassifier()
    print("The number sent is:")
    num = int(clf.classify(resized))
    print(num)

    #saving to category
    parent_dir = os.getcwd()
    directory = str(num)
    path = os.path.join(parent_dir, directory)
    if not directory in os.listdir():
        os.mkdir(path)
    # directory = os.getcwd() + "/" + category + "/"
    file_name = ''.join(random.choice('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789') for _ in range(10)) + ".png"
    file_path = os.path.join(path, file_name)
    img = Image.open(io.BytesIO(base64.decodebytes(bytes(img_data, "utf-8"))))
    img.save(file_path)
    return jsonify({"message": "Save successful","number":str(num), "error": None})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port='4000')