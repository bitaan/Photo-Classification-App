import os

import cv2
import numpy as np
from tensorflow import keras

# model = keras.models.load_model('mnist_mentium_classifier/model_preq')

class MnistClassifier:
    def __init__(self):
        # print(os.path.dirname(os.path.realpath(__file__)))
        self.model =  keras.models.load_model(os.path.dirname(os.path.abspath(__file__))+'/model_preq')

    def normalize(self,data):
        return data / 255.0


    def addChannel(self,data):
        return data.reshape((data.shape[0], data.shape[1], data.shape[1], 1))

    def classify(self,img_56):
        # img_56_gray shape = (56,56)
        img_56_gray = cv2.cvtColor(img_56, cv2.COLOR_BGR2GRAY)

        # img_28 shape = (28,28,1)
        img_28 = cv2.resize(img_56_gray, (28, 28), interpolation=cv2.INTER_AREA)

        # input_img shape = (1,28,28)
        input_img = np.expand_dims(img_28, axis=0)

        # sample shape = (1,28,28,1)
        sample = self.addChannel(input_img)

        # normalizing data
        sample = self.normalize(sample)

        #prediction
        prediction = self.model.predict(sample)

        number = np.argmax(prediction)

        return number

