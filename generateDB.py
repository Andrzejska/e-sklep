from pymongo import MongoClient
from faker import Factory
from typing import List
from random import randint
import time

client = MongoClient("mongodb://localhost:27017")
db = client.eSklep


class Comment(object):
    def __init__(self, mark: int, review: str, senderUID: str):
        self.mark = mark
        self.review = review
        self.senderUID = senderUID


def create_users(fake):
    genName = fake.first_name()
    genSurname = fake.last_name()
    role = "user"
    password = fake.pystr(8, 10)
    deliveryAddress = fake.street_address()
    phoneNumber = fake.phone_number()
    email = fake.ascii_free_email()
    result = db.users.insert_one(
        {
            'password': password,
            'email': email,
            "phoneNumber": phoneNumber,
            "deliveryAddress": deliveryAddress,
            'name': genName,
            'surname': genSurname,
            'role': role
        }

    )
    print("User added")


def create_offers(fake):
    title = fake.text(10)
    image = fake.image_url()
    sellerUID = fake.random_element([*(str(id) for id in db.users.find().distinct('_id'))])
    rating = fake.random_element([1, 2, 3, 4, 5])
    price = fake.random_int(15, 300)
    description = fake.paragraph(2)
    comments = []

    numberOfComments = fake.random_element([1, 2, 3, 4])
    for i in range(0, numberOfComments):
        mark = fake.random_element([1, 2, 3, 4, 5])
        review = fake.sentence(10)
        senderUID = fake.random_element([*(str(id) for id in db.users.find().distinct('_id'))])
        comment = Comment(mark, review, senderUID)
        comments.append(comment.__dict__)
    result = db.offers.insert_one(
        {
            'title': title,
            'rating': rating,
            'sellerUID': sellerUID,
            'price': price,
            'description': description,
            'imageSrc': image,
            'comments': comments

        }
    )
    print("Offer added")


def create_orders(fake):
    date = str(fake.date_this_decade())
    offerUID = fake.random_element([*(str(id) for id in db.users.find().distinct('_id'))])
    result = db.orders.insert_one(
        {
            'date': date,
            'offerUID': offerUID
        }
    )

    print("Order added")


def generate(fake):
    create_offers(fake)
    create_users(fake)
    create_orders(fake)


fake = Factory.create()
generate(fake)
