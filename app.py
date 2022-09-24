from flask import Flask, render_template, url_for, request, redirect, send_from_directory
from datetime import datetime
import os

# 自身の名称を app という名前でインスタンス化する
app = Flask(__name__)

def estimate_emotion(input_text):
    from transformers import pipeline, AutoModelForSequenceClassification, BertJapaneseTokenizer
    # 感情分析の実行
    model = AutoModelForSequenceClassification.from_pretrained('daigo/bert-base-japanese-sentiment') 
    tokenizer = BertJapaneseTokenizer.from_pretrained('cl-tohoku/bert-base-japanese-whole-word-masking')
    nlp = pipeline("sentiment-analysis",model=model,tokenizer=tokenizer)
    result = nlp(input_text)
    
    label = result[0].get("label")
    score = result[0].get("score")
    print(f"感情は：{label}、スコア：{score}")
    return f"感情は：{label}、スコア：{score}"

# index にアクセスされた場合の処理
@app.route('/')
def index():
    title = "Emonication"
    message = "メッセージを送信してください"

    # messageとtitleをindex.htmlに変数展開
    return render_template('index.html',
                           message=message, title=title)

# /post にアクセスされ、GETもしくはPOSTメソッドでデータが送信された場合の処理
@app.route('/post', methods=['GET', 'POST'])
def post():
    title = "Emonication"

    # GETメソッドの場合
    if request.method == 'GET':
        # トップページにリダイレクト
        return redirect(url_for('index'))

    # POSTメソッドの場合
    else:
        text = request.form['msg']
        est_param = estimate_emotion(text)
        
        # nameとtitleをindex.htmlに変数展開
        return render_template('index.html', msg=text, emotion=est_param, instraction="メッセージを送信してください")

@app.route("/src/<path:filename>")
def play(filename):
    return send_from_directory("src", filename)

if __name__ == "__main__":
    app.debug = True  # デバッグモード有効化
    app.run(host="127.0.0.1", port=8080)
