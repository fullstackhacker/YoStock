import pika
import json
import sys
import threading
import requests
import time
import os
from yahoo_finance import Share

# connect to the rabbitmq server
connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
channel = connection.channel()
channel.queue_declare(queue='stocks')


'''
constantly sends a request the yahoo api to find out the current stock price
checks to see if the stock hit a certain price
-- yes: send the username a yo
        send backend api a request to remove that stock via: delete @ /deregister/:id
-- no: do nothing

'''
def stalk(stock):
    bad = True
    share = Share(stock['symbol'])

    price = float(share.get_price())

    while bad:
        # check if in range
        if(price > stock['price'] - stock['range'] and price < stock['price'] + stock['range']): 
            #send a yo
            data = { 
                'username': stock['username'],
                'api_token': os.environ.get('API_TOKEN')
            }
            
            res = requests.post('http://api.justyo.co/yo/', params=data)
            print res

            bad = False
        else: 
            share.refresh()

'''
callback for the queue

just adds the stocks to the list
'''
def worker(ch, mehthod, properties, body):
    stock = json.loads(body)
    stock['price'] = int(stock['price'])
    stock['range'] = int(stock['range'])

    # create and start the thread for the thing
    thread = threading.Thread(target=stalk, args=(stock,))
    thread.start()
    

channel.basic_consume(worker, queue='stocks', no_ack=True)

channel.start_consuming()