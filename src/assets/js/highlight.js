import Hljs from 'highlight.js'
import 'highlight.js/styles/agate.css'

let Highlight = function (Vue) {
    Vue.directive('highlight', {
        componentUpdated: function (el) {
            let blocks = el.querySelectorAll('pre code'); // querySelectorAll可以根据自己的富文本生成的代码做调整 我这里默认刚好
            console.log(el)
            console.log(blocks)
            blocks.forEach((block) => { // 在forEach中做一些操作
                let uls = block.parentNode.querySelectorAll("ul");
                uls.forEach((ul) => {
                    block.parentNode.removeChild(ul);
                });
                console.log(uls);
                // block.parentNode.removeChild(ul);

                // 1.创建ul节点
                let ul = document.createElement("ul");
                // 2.根据换行符获取行数，根据获取的行数生成行号
                let rowCount = block.outerHTML.split('\n').length;
                // console.log(block.outerHTML);
                // console.log(rowCount);
                for (let i = 1; i < rowCount; i++) {
                    //创建li节点，创建文本节点
                    let li = document.createElement("li")
                    let text = document.createTextNode(i)
                    //为li追加文本节点，将li加入ul
                    li.appendChild(text)
                    ul.appendChild(li)
                }
                // 3.给行号添加类名
                ul.className = 'pre-numbering'
                // 4.将ul节点加到 代码块
                block.parentNode.appendChild(ul)
                Hljs.highlightBlock(block)
            })
        }
    })
}
export default Highlight