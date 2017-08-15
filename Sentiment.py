#!C:\Python27\python.exe  
import json
import urllib2
import cgi  
import cgitb  
import re  
import tweepy    
import sys
from tweepy import OAuthHandler  

from textblob import TextBlob  
cgitb.enable()  
request = json.load(sys.stdin)
print"Content-Type: application/json\n"
print"\n"

class TwitterClient(object):
    '''
    Generic Twitter Class for sentiment analysis.
    '''

    def __init__(self):
        '''
        Class constructor or initialization method.
        '''
        # keys and tokens from the Twitter Dev Console
        consumer_key = '6np6r6TPspLKLsl0UukYpc2YU'
        consumer_secret = 'twRMcga6wygBlls2naBIxrGK91akB9W6P5o3uiPBj6nzry0yRu'
        access_token = '3278465078-3ZGHyvElbZMzcuugAdxlYb5IP0iNI5DFf2Ng37h'
        access_token_secret = 'flFWQH9m07rNNoxHy7sxsWa6XZIx9s2zMyZuv9C1N6Gld'

        # attempt authentication
        try:
            # create OAuthHandler object
            self.auth = OAuthHandler(consumer_key, consumer_secret)
            # set access token and secret
            self.auth.set_access_token(access_token, access_token_secret)
            # create tweepy API object to fetch tweets
            self.api = tweepy.API(self.auth)
        except:
            print("Error: Authentication Failed")

    def clean_tweet(self, tweet):
        '''
        Utility function to clean tweet text by removing links, special characters
        using simple regex statements.
        '''
        return ' '.join(re.sub("(@[A-Za-z0-9]+)|([^0-9A-Za-z \t])| (\w +:\ / \ / \S +)", " ", tweet).split())

    def get_tweet_sentiment(self, tweet):
        '''
        Utility function to classify sentiment of passed tweet
        using textblob's sentiment method
        '''
        # create TextBlob object of passed tweet text
        analysis = TextBlob(self.clean_tweet(tweet))
        # set sentiment
        if analysis.sentiment.polarity > 0:
            return 'positive'
        elif analysis.sentiment.polarity == 0:
            return 'neutral'
        else:
            return 'negative'

    def get_tweets(self, query, count):
        '''
        Main function to fetch tweets and parse them.
        '''
        # empty list to store parsed tweets
        tweets = []

        try:
            # call twitter api to fetch tweets
            fetched_tweets = self.api.search(q=query,lang='en', count=count)
            

            # parsing tweets one by one
            for tweet in fetched_tweets:
                # empty dictionary to store required params of a tweet
                parsed_tweet = {}

                # saving text of tweet
                parsed_tweet['text'] = tweet.text
                # saving sentiment of tweet
                parsed_tweet['sentiment'] = self.get_tweet_sentiment(tweet.text)

                # appending parsed tweet to tweets list
                if tweet.retweet_count > 0:
                    # if tweet has retweets, ensure that it is appended only once
                    if parsed_tweet not in tweets:
                        tweets.append(parsed_tweet)
                else:
                    tweets.append(parsed_tweet)

            # return parsed tweets
            return tweets

        except tweepy.TweepError as e:
            # print error (if any)
            print("Error : " + str(e))
  
def main(): 
    api=TwitterClient()
    
    
    tweets = api.get_tweets(query=request['input'], count=int(request['count']) ) 
    
    # picking positive tweets from tweets
    ptweets = [tweet for tweet in tweets if tweet['sentiment'] == 'positive']
   
    # picking negative tweets from tweets
    ntweets = [tweet for tweet in tweets if tweet['sentiment'] == 'negative']
    
    x = len(tweets)
    y = len(ntweets)
    z = len(ptweets)
    l = x - (y+z)

    json.dump({"ptweets":ptweets,"ntweets":ntweets, "total": x, "negative": y, "positive": z},sys.stdout,indent=2);
    
if __name__ == "__main__":
    # calling main function
        main()
           
       
