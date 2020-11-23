<template>
  <div class="select-main">
    <div class="main">
      <!-- 中间核心部分 -->
      <div class="mid">
        <div class="mid-inside">
          <!-- 内部第一行 -->
          <div class="inside-top">
            <div>
              <div class="top-title">收到消息回复</div>
              <p class="top-tips first-tip">
                通过编辑内容或关键词规则，快速进行自动回复设置。如具备开发能力，可更灵活地使用该功能。<a>查看详情</a>
              </p>
              <p class="top-tips">
                关闭自动回复之后，将立即对所有用户生效。
              </p>
            </div>
          </div>
          <div class="inside-main">
            <!-- 回复，添加回复控制页面 -->
            <div class="message-send-area">
              <div class="change-sec">
                <ul>
                  <li class="word-sec">文字</li>
                  <li class="pic-sec">图片</li>
                  <li class="audio-sec">音频</li>
                  <li class="video-sec">视频</li>
                </ul>
              </div>
              <div class="text-area">
                <div id="edit-area" contenteditable="true" class="edit-area">{{ replyContent }}</div>
                <div class="edit-toolbar">
                  <div class="emotion">
                    <a>
                      <i />
                    </a>
                    <div class="emotions">
                      <div id="emotions-inner">
                        <div>
                          <ul>
                            <li v-for="(count,index) in emojiTest.emoji" :key="index" @click="addEmoji(index)">
                              <span>{{ count }}</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p>，按下Enter键换行</p>
                  <p>
                    还可以输入<em>600</em>字
                  </p>
                </div>
              </div>
            </div>
            <div class="tool-bar">
              <button class="save-btn" @click="getReply()">保存</button>
              <div class="delete-btn-sec">
                <button class="delete-btn" @click="deleteReply()">删除回复</button>
                <div :class="this.delete === false?'hide':''" class="hide-delete-sec">
                  <div class="delete-sec-inner">
                    <div class="delete-inner-word">
                      删除后，关注该公众号的用户将不再接收该回复，确定删除？
                    </div>
                    <div class="delete-inner-button">
                      <div>
                        <button class="determine" @click="deleteDetermine()">确定</button>
                        <button class="cancle" @click="cancleDelete()">取消</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  addMessageAndFollowRule,
  getRulesByCategory,
  deleteRuleById
} from '../../../api/officalAccount/request.js'
import emojiList from '../../../assets/officalAccount/emoji.js'
export default {
  data() {
    return {
      replyContent: '',
      delete: false,
      replyId: 0,
      emojiTest: {}
    }
  },
  created() {
    this.emojiTest = emojiList
    getRulesByCategory(1).then(res => {
      if (res.data.length !== 0) {
        this.replyId = res.data[0].id
        this.replyContent = JSON.parse(res.data[0].content)[0].content
      }
    })
  },
  mounted() {},
  methods: {
    addEmoji(id) {
      const emoji = this.emojiTest.emoji[id]
      const span = document.createElement('span')
      span.innerHTML = emoji
      document.getElementById('edit-area').appendChild(span)
    },
    getReply() {
      const info = document.getElementById('edit-area').innerText
      const content = [{
        'type': 'text',
        'content': info
      }]
      const params = {
        category: 1,
        content: JSON.stringify(content)
      }
      console.log(typeof params.content)
      addMessageAndFollowRule(params).then(res => {
        console.log(res)
        window.location.reload()
      })
    },
    deleteReply() {
      this.delete = true
    },
    cancleDelete() {
      this.delete = false
    },
    deleteDetermine() {
      this.deleteOn = 1
      deleteRuleById(this.replyId).then(res => {
        console.log(res)
        window.location.reload()
      })
    }
  }
}
</script>

<style scoped="scoped">
    * {
      margin: 0;
      padding: 0;
    }

    ul {
      list-style: none;
    }

    a,button {
        cursor: pointer;
    }

    .hide {
        display: none;
    }

    .select-main {
        width: 1290px;
        height: 990px;
    }

    .main {
        width: 90%;
        height: 100%;
        margin: 0 auto;
    }

    .mid {
        display: inline-block;
        width: 1080px;
        margin-bottom: 30px;
        margin-top: 40px;
        padding: 24px 40px;
        background-color: #fff;
        box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.05);
        border-radius: 3px;
    }

    /* 中部头部部分 */
    .inside-top {
        position: relative;
        padding: 16px 100px 16px 0;
    }

    .top-title {
        font-size: 20px;
        font-weight: 400;
        line-height: 1;
    }

    .first-tip {
        padding-top: 7px;
    }

    .top-tips {
        margin-top: 3px;
        font-size: 14px;
        color: #9a9a9a;
    }

    .top-tips a {
        text-decoration: none;
        color: #576B95;
    }

    /* 关键词回复主体内容部分 */
    .inside-main {
        padding-top: 40px;
        margin-top: 25px;
        border-top: 1px solid #E4E8EB;
    }
    .message-send-area {
        border: 1px solid #E4E8EB;
        background-color: #FFFFFF;
    }
    .message-send-area .change-sec ul {
        overflow: hidden;
        line-height: 38px;
        background-color: #FFFFFF;
    }
    .message-send-area .change-sec ul li {
        float: left;
        padding: 0 20px;
        cursor: pointer;
        font-size: 14px;
    }
    .message-send-area .change-sec ul li::before {
        content: " ";
        display: inline-block;
        width: 22px;
        height: 20px;
        vertical-align: middle;
        margin: -0.2em 5px 0 0;
    }
    .word-sec::before {
        background-image: url(https://res.wx.qq.com/mpres/zh_CN/htmledition/pages/modules/msg_sender/svg/default/sender_text4273fb.svg);
    }
    .pic-sec::before {
        background-image: url(https://res.wx.qq.com/mpres/zh_CN/htmledition/pages/modules/msg_sender/svg/default/sender_img4273fb.svg);
    }
    .audio-sec::before {
        background-image: url(https://res.wx.qq.com/mpres/zh_CN/htmledition/pages/modules/msg_sender/svg/default/sender_audio4273fb.svg);
    }
    .video-sec::before {
        background-image: url(https://res.wx.qq.com/mpres/zh_CN/htmledition/pages/modules/msg_sender/svg/default/sender_video4273fb.svg);
    }
    .text-area {
        border-top: 1px solid #E4E8EB;
    }
    .edit-area {
        padding: 16px 20px;
        outline: 0;
        color: #353535;
        word-wrap: break-word;
        background-color: #FFFFFF;
        height: 184px;
        overflow-y: auto;
        font-size: 14px;
    }
    .edit-toolbar {
        font-size: 14px;
        padding: 0 20px;
        line-height: 36px;
        background-color: #FFFFFF;
        border-top: 1px solid #E4E8EB;
    }
    .emotion {
        display: inline-block;
        vertical-align: middle;
        position: relative;
        font-size: 14px;
    }
    .emotion:hover .emotions {
        display: block;
    }
    .emotion a {
        float: left;
        height: 28px;
        width: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        font-size: 0;
        cursor: pointer;
    }
    .emotion a i {
        background: transparent url(https://res.wx.qq.com/mpres/zh_CN/htmledition/pages/modules/reply/images/icon_emotion4510e1.svg) no-repeat 0 0;
        width: 20px;
        height: 20px;
        vertical-align: middle;
        display: inline-block;
    }
    .edit-toolbar p {
        float: right;
        color: #9A9A9A;
    }
    .edit-toolbar p em {
        font-style: normal;
        margin: 0 3px;
    }

    .emotions {
        width: 396px;
        padding: 5px;
        left: 50%;
        margin-left: -46px;
        top: 100%;
        position: absolute;
        z-index: 500;
        text-align: left;
        color: #353535;
        line-height: 1.6;
        white-space: normal;
        word-wrap: break-word;
        display: none;
    }
    #emotions-inner {
        position: relative;
        padding: 24px;
        box-sizing: border-box;
        background: #FFFFFF;
        box-shadow: 0 1px 20px 0 rgba(0, 0, 0, 0.1);
        border-radius: 2px;
    }
    #emotions-inner::before {
        position: absolute;
        left: 42px;
        top: -4px;
        content: " ";
        width: 8px;
        height: 8px;
        background-color: #FFFFFF;
        box-shadow: 0 -10px 15px 0 #D4D4D4;
        transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    }
    #emotions-inner ul {
        overflow: hidden;
        position: relative;
        z-index: 1;
    }
    #emotions-inner ul li {
        float: left;
        width: 24px;
        height: 24px;
        line-height: 24px;
        font-size: 0;
        text-align: center;
        background-color: #FFFFFF;
    }
    #emotions-inner ul li span {
        font-size: 16px;
        cursor: pointer;
        width: 20px;
        height: 20px;
        vertical-align: middle;
        display: inline-block;
        /* background: transparent url(../assets/icon_emotion_panel.2x4be7aa.png) no-repeat 0 0; */
        /* background-size: 20px auto; */
    }
    .tool-bar {
        margin-top: 40px;
        padding-bottom: 65px;
    }
    .tool-bar button {
        margin-right: 1.2em;
        display: inline-block;
        padding: 0 22px;
        min-width: 54px;
        line-height: 2.42857143;
        vertical-align: middle;
        text-align: center;
        text-decoration: none;
        border-radius: 3px;
        font-size: 14px;
        cursor: pointer;
        border-width: 1px;
        border-style: solid;
        box-sizing: content-box;
    }
    .save-btn {
        background-color: #07C160;
        border-color: #07C160;
        color: #FFFFFF;
    }
    .delete-btn-sec {
        position: relative;
        display: inline-block;
    }
    .delete-btn {
        background-color: #F5F6F6;
        border-color: #E4E8EB;
        color: #CCCDCD;
    }
    .hide-delete-sec {
        right: 50%;
        margin-right: -38px;
        top: 100%;
        padding-top: 5px;
        width: 280px;
        position: absolute;
        z-index: 500;
        text-align: left;
        color: #353535;
        line-height: 1.6;
        white-space: normal;
        word-wrap: break-word;
        font-size: 14px;
    }
    .delete-sec-inner {
        position: relative;
        padding: 24px;
        box-sizing: border-box;
        background: #FFFFFF;
        box-shadow: 0 1px 20px 0 rgba(0, 0, 0, 0.1);
        border-radius: 2px;
    }
    .delete-sec-inner::before {
        right: 42px;
        top: -4px;
        content: " ";
        width: 8px;
        height: 8px;
        background-color: #FFFFFF;
        box-shadow: 0 -10px 10px 0 #D4D4D4;
        transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
        position: absolute;
    }
    .delete-inner-button {
        margin-top: 24px;
        text-align: center;
    }
    .delete-inner-button button {
        margin: 0 7px;
        display: inline-block;
        padding: 0 22px;
        min-width: 54px;
        line-height: 2.42857143;
        vertical-align: middle;
        text-align: center;
        text-decoration: none;
        border-radius: 3px;
        font-size: 14px;
        cursor: pointer;
        border-width: 1px;
        border-style: solid;
        box-sizing: content-box;
    }
    .determine {
        background-color: #07C160;
        border-color: #07C160;
        color: #FFFFFF;
    }
    .cancle {
        background-color: #FBFBFB;
        border-color: #E4E8EB;
        color: #353535;
    }
</style>
