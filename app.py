from flask import Flask, render_template, url_for, request, redirect, send_from_directory
from datetime import datetime
import os

# 自身の名称を app という名前でインスタンス化する

app = Flask(__name__, static_folder='./templates/images')

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
     
        # nameとtitleをindex.htmlに変数展開
        return render_template('index.html', msg=text, emotion=est_param, instraction="メッセージを送信してください")

@app.route("/src/<path:filename>")
def play(filename):
    return send_from_directory("src", filename)

if __name__ == "__main__":
    app.debug = True  # デバッグモード有効化
    app.run(host="127.0.0.1", port=8080)
