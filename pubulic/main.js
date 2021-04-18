/*请求 JSON */
getJSON.onclick = () => {
    const request = new XMLHttpRequest();
    request.open("GET", "/5.json"); //请求方法及打开文件
    request.onreadystatechange = () => {
      if (request.readyState === 4 && request.status === 200/* 满足此条件说明加载成功 */) {
        console.log(typeof request.response);
        console.log(request.response);
        const bool = JSON.parse(request.response);//字符串编数据
        console.log(typeof bool);
        console.log(bool);
      }
    };
    request.send();
  };//记得提前创建server.js中的路径！！！

/*请求 XML*/
getXML.onclick = () => {
    const request = new XMLHttpRequest();
    request.open('GET', '/4.xml')
    request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status === 200 /* 满足此条件说明加载成功 */) {
           const dom = request.responseXML
           const text = dom.getElementsByTagName('warning')[0].textContent
           console.log(text.trim())
        }
    }
    request.send()
}

/*请求html*/
getHTML.onclick = () => {
    const request = new XMLHttpRequest(); //创建请求
    request.open('GET', '3.html') //设置请求方法及请求文件
    request.onload = () => {
        const html = document.createElement('html')
        html.innerHTML = request.response
        document.body.appendChild(html)
    } //登录成功显示
    request.onerror = () => {
        console.log('失败了')
    }//登录失败显示
    request.send()
    //发送
}


/*请求JS*/
getJS.onclick = () => {
    const request = new XMLHttpRequest(); //创建一个HttpRequest对象
    request.open('GET', '/2.js') //请求方法和路径
    request.onload = () => {
        const script = document.createElement('script')
        script.innerHTML = request.response
        document.body.appendChild(script)
    }// 利用dom的库，添加一个style，将css样式内容（request.response）放入,再将其放入html的body中
    request.onerror = () => {
        console.log('失败了')
    }
    request.send() //发送
}

/*请求CSS*/

/*不用HTML而用JS获取CSS样式，此方法使用之前，css文件路径要再server.js中出现*/
getCSS.onclick = () => {
    const request = new XMLHttpRequest(); //创建一个HttpRequest对象
    request.open("GET", "/style.css"); //利用open属性打开css, readyState(阶段1：打开)
    request.onreadystatechange = () => {
        console.log(request.readyState)
        if (request.readyState === 4) {
            console.log('下载完成')
            //下载完成但是不知道成功 2xx 还是 4xx 等 设置一个if循环来试一下
            if (request.status >= 200 && request.status < 300) {
                const style = document.createElement('style')
                style.innerHTML = request.response //style内容变成css样式，只有在readyState阶段4才能获取到response
                document.head.appendChild(style)
                // 利用dom的库，添加一个style，将css样式内容（request.response）放入,再将其放入html的head中
            } else {
                alert('加载CSS失败')
            }
        }
    };
    request.send() //发送请求，启动调用readyState(阶段2：调用)

    /*
    onload 和 onerror 方法很low  我们用onreadystatechange
        request.onload = () => {
            console.log('request.response')
            console.log(request.response)
            //确定request.response的内容（就是css的样式）
    
            const style = document.createElement('style')
            style.innerHTML = request.response //style内容变成css样式
            document.head.appendChild(style)
            // 利用dom的库，添加一个style，将css样式内容（request.response）放入,再将其放入html的head中
        }
        request.onerror = () => {
            console.log('失败了')
        }//利用load和error监听事件，监听css是否调用成功
        request.send() //发送请求，启动调用
    */


}


/*关于 readyState
它伴随着一个请求的过程：
  1表示打开阶段，如： request.open...
  2表示调用阶段,如： request.send...
  3表示开始下载，如你在浏览器看到一个信息开始，这个阶段就是3
  4表示下载完成
*/

