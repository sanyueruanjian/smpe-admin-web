<template>
  <div class="select-main">
    <div class="main">
      <!-- 中间核心部分 -->
      <div class="mid">
        <div class="mid-inside">
          <!-- 内部第一行 -->
          <div class="inside-top">
            <div>
              <div class="top-title">关键字回复</div>
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
            <div :class="addpage === true?'hide':''">
              <!-- 搜索框 -->
              <div>
                <div class="inside-main-top">
                  <div class="search">
                    <span class="input-right">
                      <span class="search-icon">
                        <button>
                          <div>
                            <svg style="fill: #9A9A9A;" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                              <path d="M11.33 10.007l4.273 4.273a.502.502 0 0 1 .005.709l-.585.584a.499.499 0 0 1-.709-.004L10.046 11.3a6.278 6.278 0 1 1 1.284-1.294zm.012-3.729a5.063 5.063 0 1 0-10.127 0 5.063 5.063 0 0 0 10.127 0z" />
                            </svg>
                          </div>
                        </button>
                      </span>
                      <input placeholder="搜索关键词/规则名称" type="text">
                    </span>
                  </div>
                </div>
                <!-- 添加回复 -->
                <div class="add-raply">
                  <button @click="addPage()">添加回复</button>
                </div>
              </div>
              <!-- 添加回复部分 -->
              <div>
                <table class="reply-table">
                  <thead>
                    <tr>
                      <th>规则名称</th>
                      <th>关键词</th>
                      <th>回复内容</th>
                      <th>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr />
                    <tr v-for="(info,index) in keyData" :key="index">
                      <td class="keywords-rule">{{ info.title }}</td>
                      <td class="keywords-name">
                        <span v-for="(key,keyIndex) in JSON.parse(info.keyWord)" :key="keyIndex">
                          {{ key.keyWord }}
                        </span>
                      </td>
                      <td class="keywords-reply">
                        <span v-if="replyCon[index].text !== 0">{{ replyCon[index].text }}文本</span>
                        <span v-if="replyCon[index].image !== 0">{{ replyCon[index].image }}图片</span>
                        <span v-if="replyCon[index].voice !== 0">{{ replyCon[index].voice }}音频</span>
                        <span v-if="replyCon[index].video !== 0">{{ replyCon[index].video }}视频</span>
                        <span v-if="replyCon[index].news !== 0">{{ replyCon[index].news }}公告</span>
                      </td>
                      <td>
                        <div>
                          <a class="operation-link">详情</a>
                          <a class="operation-link" :data-type="index" @click="fixKeyReply($event)">编辑</a>
                          <div class="operation-link delete-sec">
                            <span>
                              <a @click="deleteAppear(index)">删除</a>
                            </span>
                            <div id="delete-rule" class="delete-rule">
                              <div class="delete-inner">
                                <div>
                                  <p>确定要删除规则吗？</p>
                                </div>
                                <div class="delete-rule-btn">
                                  <button :data-type="info.id" @click="deleteReply($event)">确定</button>
                                  <button id="delete-btn-cancle" @click="deleteDis(index)">取消</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <!-- 添加回复操作页面 -->
            <div :class="addpage === false?'hide':''">
              <form class="add-form">
                <div class="add-form-input">
                  <label>规则名称</label>
                  <div class="add-input-area">
                    <div>
                      <span>
                        <input v-if="keyReply === 1" id="get-rule" type="text" placeholder="输入规则名称" :value="keyData[fixItem].title">
                        <input v-if="keyReply !== 1" id="get-rule" type="text" placeholder="输入规则名称">
                      </span>
                    </div>
                    <p>规则名最多60个字</p>
                  </div>
                </div>
                <div v-for="(count,index) in keyNum" :key="index" class="add-form-input">
                  <label>关键词</label>
                  <div class="add-input-area">
                    <div>
                      <span>
                        <span v-if="index === keyNum - 1" class="add-button">
                          <button type="button" @click="addKeyReply()" />
                        </span>
                        <span v-if="index !== 0 && index != keyNum -1" style="right: -30px;" class="reduce-button">
                          <button type="button" @click="reduceKeyReply()" />
                        </span>
                        <span v-if="index === keyNum - 1 && index !== 0" class="reduce-button">
                          <button type="button" @click="reduceKeyReply()" />
                        </span>
                        <span tabindex="1" class="keyword-match" @blur="matchHide()">
                          <div class="keyword-match-show">
                            <dl>
                              <dt id="match-type" class="match-type" @click="matchAppear()">全匹配</dt>
                              <div :class="match === true?'':'hide'" class="match-dropdown">
                                <ul>
                                  <!-- <li>
                                    <div class="match-contain">
                                      <span :data-type="0" @click="getMatch($event)">半匹配</span>
                                    </div>
                                  </li> -->
                                  <li>
                                    <div class="match-contain">
                                      <span :data-type="1" @click="getMatch($event)">全匹配</span>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </dl>
                          </div>
                        </span>
                        <input
                          v-if="keyReply === 1 && index < JSON.parse(keyData[fixItem].keyWord).length"
                          class="into-key"
                          type="text"
                          placeholder="输入关键词"
                          :value="JSON.parse(keyData[fixItem].keyWord)[index].keyWord"
                        >
                        <input
                          v-if="keyReply === 1 && index > JSON.parse(keyData[fixItem].keyWord).length - 1"
                          class="into-key"
                          type="text"
                          placeholder="输入关键词"
                        >
                        <input v-if="keyReply === 0" class="into-key" type="text" placeholder="输入关键词">
                      </span>
                    </div>
                  </div>
                </div>
                <div class="add-form-input">
                  <label>回复内容</label>
                  <div class="reply-content">
                    <div>
                      <ul v-if="replyContent !== '' || keyReply === 1" class="keywords-reply-list">
                        <li class="keywords-reply-item">
                          <span class="keywords-show">
                            <div class="media-text">
                              <!-- 当状态为修改时 -->
                              <span v-if="keyReply === 1">
                                <span v-for="(content,index) in JSON.parse(keyData[fixItem].content)" :key="index">
                                  <span v-if="content.type === 'text' && fixContent === false">
                                    {{ content.content }}
                                    <span v-html="replyContent">{{ replyContent }}</span>
                                  </span>
                                </span>
                                <span v-if="fixContent === true">
                                  <span v-html="replyContent">{{ replyContent }}</span>
                                </span>
                              </span>
                              <span v-if="keyReply === 0" v-html="replyContent">{{ replyContent }}</span>
                              <div />
                            </div>
                          </span>
                        </li>
                      </ul>
                      <div class="add-content-area">
                        <button class="replay-content-type" type="button" />
                        <div class="add-type-hide">
                          <ul>
                            <li data-type="1" @click="outContent($event)">
                              图文消息
                            </li>
                            <li data-type="2" @click="outContent($event)">
                              文字
                            </li>
                            <li data-type="3" @click="outContent($event)">
                              图片
                            </li>
                            <li data-type="4" @click="outContent($event)">
                              音频
                            </li>
                            <li data-type="5" @click="outContent($event)">
                              视频
                            </li>
                          </ul>
                        </div>
                      </div>
                      <!-- 隐藏回复内容操作框 -->
                      <!-- 图文消息回复内容 -->
                      <div>
                        <div class="hide-dialog hide-imtx-dialog" style="display: none;">
                          <div class="hide-dialog-sec">
                            <div class="hide-dialog-head">
                              <h3>选择素材</h3>
                              <button class="hide-btn-common">
                                <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M10.01 8.996l7.922-7.922c.086-.086.085-.21.008-.289l-.73-.73c-.075-.074-.208-.075-.29.007L9 7.984 1.077.062C.995-.02.863-.019.788.055l-.73.73c-.078.078-.079.203.007.29l7.922 7.92-7.922 7.922c-.086.086-.085.212-.007.29l.73.73c.075.074.207.074.29-.008l7.92-7.921 7.922 7.921c.082.082.215.082.29.008l.73-.73c.077-.078.078-.204-.008-.29l-7.921-7.921z" />
                                </svg>
                              </button>
                            </div>
                            <div class="hide-dialog-body">
                              <div class="dialog-body-top">
                                <div class="body-top-search">
                                  <div />
                                  <span class="top-search-input">
                                    <span>
                                      <button class="hide-btn-common">
                                        <div>
                                          <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11.33 10.007l4.273 4.273a.502.502 0 0 1 .005.709l-.585.584a.499.499 0 0 1-.709-.004L10.046 11.3a6.278 6.278 0 1 1 1.284-1.294zm.012-3.729a5.063 5.063 0 1 0-10.127 0 5.063 5.063 0 0 0 10.127 0z" />
                                          </svg>
                                        </div>
                                      </button>
                                    </span>
                                    <input placeholder="搜索图文信息" type="text">
                                  </span>
                                </div>
                                <div class="new-build">
                                  <button class="hide-btn-common">新建</button>
                                </div>
                              </div>
                              <div class="dialog-body-main">
                                <p>暂无数据</p>
                              </div>
                              <div class="hide-dialog-select">
                                <button class="hide-select-btn">确定</button>
                                <button class="hide-select-btn hide-cancel-btn">取消</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- 文字回复内容 -->
                      <div>
                        <div v-if="contentType === '2'" class="hide-dialog hide-text-dialog">
                          <div class="hide-dialog-sec">
                            <div class="hide-dialog-head">
                              <h3>添加回复文字</h3>
                              <button type="button" class="hide-btn-common" @click="hideContent()">
                                <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M10.01 8.996l7.922-7.922c.086-.086.085-.21.008-.289l-.73-.73c-.075-.074-.208-.075-.29.007L9 7.984 1.077.062C.995-.02.863-.019.788.055l-.73.73c-.078.078-.079.203.007.29l7.922 7.92-7.922 7.922c-.086.086-.085.212-.007.29l.73.73c.075.074.207.074.29-.008l7.92-7.921 7.922 7.921c.082.082.215.082.29.008l.73-.73c.077-.078.078-.204-.008-.29l-7.921-7.921z" />
                                </svg>
                              </button>
                            </div>
                            <div class="hide-dialog-body">
                              <div class="text-editor-sec">
                                <div v-if="keyReply === 1" id="editor-area" contenteditable="true" class="editor-area">
                                  <span v-for="(content,index) in JSON.parse(keyData[fixItem].content)" :key="index">
                                    <span v-if="content.type === 'text' && fixContent === false">{{ content.content }}</span>
                                  </span>
                                  <span v-if="fixContent === true">
                                    <span v-html="replyContent">{{ replyContent }}</span>
                                  </span>
                                </div>
                                <div
                                  v-if="keyReply === 0"
                                  id="editor-area"
                                  contenteditable="true"
                                  class="editor-area"
                                  v-html="replyContent"
                                >{{ replyContent }}</div>
                                <div class="editor-toolbar">
                                  <div class="left-emotion">
                                    <span>
                                      <a>
                                        <i />
                                      </a>
                                    </span>
                                    <div class="emotions">
                                      <div class="emotions-inner">
                                        <div>
                                          <ul>
                                            <li v-for="(count,index) in emojiTest.emoji" :key="index" @click="addEmoji(index)">
                                              <span>{{ count }}</span>
                                            </li>
                                            <!-- <li v-for="(count,index) in 112" :key="index">
                                              <span :style="{backgroundPositionX: 0+'px',backgroundPositionY:-(count-1)*20+'px'}" />
                                            </li> -->
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <p class="right-toolbar">，按下Enter键换行</p>
                                  <p class="right-toolbar">还可以输入<em>300</em>字</p>
                                </div>
                              </div>
                            </div>
                            <div class="hide-dialog-select">
                              <button type="button" class="hide-select-btn" @click="getReplyContent(keyReply)">确定</button>
                              <button type="button" class="hide-select-btn hide-cancel-btn" @click="hideContent()">取消</button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div />
                      <div />
                      <div />
                    </div>
                  </div>
                </div>
                <div class="add-form-input">
                  <label>回复方式</label>
                  <div class="reply-way">
                    <div>
                      <label data-type="0" name="reply-way" @click="replyWay(0)">
                        <a v-if="keyReply === 1">
                          <i
                            v-if="keyData[fixItem].type === 0"
                            style="border-width: 5px; border-color: rgb(7, 193, 96);"
                            class="reply-way-radio"
                          />
                          <i v-if="keyData[fixItem].type !== 0" class="reply-way-radio" />
                        </a>
                        <a v-if="keyReply === 0">
                          <i class="reply-way-radio" style="border-width: 5px; border-color: rgb(7, 193, 96);" />
                        </a>
                        <span>回复全部</span>
                      </label>
                      <label data-type="1" name="reply-way" @click="replyWay(1)">
                        <a v-if="keyReply === 1">
                          <i
                            v-if="keyData[fixItem].type === 1"
                            style="border-width: 5px; border-color: rgb(7, 193, 96);"
                            class="reply-way-radio"
                          />
                          <i v-if="keyData[fixItem].type !== 1" class="reply-way-radio" />
                        </a>
                        <a v-if="keyReply === 0">
                          <i class="reply-way-radio" />
                        </a>
                        <span>随机回复一条</span>
                      </label>
                    </div>
                  </div>
                </div>
              </form>
              <div>
                <div class="hide-dialog-select">
                  <button v-if="keyReply === 1" class="hide-select-btn reply-btn" @click="autoReplyCollect(keyData[fixItem].id)">保存</button>
                  <button v-if="keyReply === 0" class="hide-select-btn reply-btn" @click="autoReplyCollect()">保存</button>
                  <button class="hide-select-btn hide-cancel-btn reply-btn" @click="back()">取消</button>
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
  addKeyWordRule,
  getRulesByCategory,
  deleteRuleById,
  updataKeyWordRule
} from '../../../api/officalAccount/request.js'
import emojiList from '../../../assets/officalAccount/emoji.js'
export default {
  data() {
    return {
      addpage: false,
      match: false,
      fixContent: false,
      contentType: 0,
      keyReply: 0,
      fixItem: 0,
      keyNum: 1,
      replyType: 1,
      replyContent: '',
      keyData: {},
      replyCon: [],
      emojiTest: {}
    }
  },
  created() {
    this.emojiTest = emojiList
    getRulesByCategory(2).then(res => {
      this.keyData = res.data
      console.log(this.keyData)
      const replyCon = []
      for (let a = 0; a < this.keyData.length; a++) {
        const lists = JSON.parse(this.keyData[a].content)
        let text = 0
        let image = 0
        let voice = 0
        let video = 0
        let news = 0
        for (let b = 0; b < lists.length; b++) {
          if (lists[b].type === 'text') {
            text = text + 1
          } else if (lists[b].type === 'image') {
            image = image + 1
          } else if (lists[b].type === 'voice') {
            voice = voice + 1
          } else if (lists[b].type === 'video') {
            video = video + 1
          } else if (lists[b].type === 'news') {
            news = news + 1
          }
        }
        replyCon[a] = {
          text: text,
          image: image,
          voice: voice,
          video: video,
          news: news
        }
      }
      this.replyCon = replyCon
    })
  },
  mounted() {},
  methods: {
    addEmoji(id) {
      const emoji = this.emojiTest.emoji[id]
      const span = document.createElement('span')
      span.innerHTML = emoji
      document.getElementById('editor-area').appendChild(span)
    },
    // 页面跳转
    addPage() {
      this.addpage = true
      this.keyReply = 0
      this.keyNum = 1
    },
    back() {
      this.addpage = false
      this.keyReply = 0
      this.fixContent = false
    },
    // 关键词匹配显示和隐藏
    matchAppear() {
      this.match = !this.match
    },
    matchHide() {
      this.match = false
    },
    // 获取关键词匹配模式
    getMatch(obj) {
      if (obj.srcElement.dataset.type === 0) {
        document.getElementById('match-type').innerHTML = '半匹配'
        this.match = !this.match
      } else if (obj.srcElement.dataset.type === 1) {
        document.getElementById('match-type').innerHTML = '全匹配'
        this.match = !this.match
      }
    },
    // 点击不同的回复内容展示不同框
    outContent(obj) {
      this.contentType = obj.srcElement.dataset.type
    },
    hideContent() {
      this.contentType = 0
    },
    // 点击添加回复按钮添加关键词操作字段
    addKeyReply() {
      this.keyNum = this.keyNum + 1
    },
    // 点击减少回复按钮减少关键词操作字段
    reduceKeyReply() {
      this.keyNum = this.keyNum - 1
    },
    // 获取添加到回复文字
    getReplyContent(keyReply) {
      console.log(keyReply)
      if (keyReply === 1) {
        this.fixContent = true
        this.replyContent = document.getElementById('editor-area').innerText
      } else if (keyReply === 0) {
        this.replyContent = document.getElementById('editor-area').innerText
      }
      this.contentType = 0
    },
    // 点击修改触发事件
    fixKeyReply(obj) {
      this.addpage = true
      this.keyReply = 1
      this.fixItem = obj.srcElement.dataset.type
      this.replyType = this.keyData[this.fixItem].type
      this.keyNum = JSON.parse(this.keyData[this.fixItem].keyWord).length
      console.log(JSON.parse(this.keyData[this.fixItem].keyWord)[0])
    },
    // 点击删除显示
    deleteAppear(index) {
      const deleteList = document.getElementsByClassName('delete-rule')
      deleteList[index].style.display = 'block'
    },
    deleteDis(index) {
      const deleteList = document.getElementsByClassName('delete-rule')
      deleteList[index].style.display = 'none'
    },
    deleteReply(obj) {
      const id = obj.srcElement.dataset.type.toString()
      deleteRuleById(id).then(res => {
        console.log(res)
        window.location.reload()
      })
    },
    // 回复方式操作
    replyWay(obj) {
      const _this = this
      const types = document.getElementsByClassName('reply-way-radio')
      if (obj === 0) {
        types[0].style.borderWidth = '5px'
        types[0].style.borderColor = '#07C160'
        types[1].style.border = '1px solid #C9CDD3'
        _this.replyType = 0
      } else if (obj === 1) {
        types[1].style.borderWidth = '5px'
        types[1].style.borderColor = '#07C160'
        types[0].style.border = '1px solid #C9CDD3'
        _this.replyType = 1
      }
    },
    // 收集数据调用接口传参
    autoReplyCollect(id) {
      console.log(id)
      const category = 2
      const keyWord = []
      let title = ''
      let content = []
      const keyList = document.getElementsByClassName('into-key')
      for (let a = 0; a < keyList.length; a++) {
        keyWord.push({
          'keyWord': keyList[a].value
        })
      }
      content = [{
        'type': 'text',
        'content': this.replyContent
      }]
      title = document.getElementById('get-rule').value
      console.log(category, content, keyWord, title, this.replyType)
      const lists = {
        category: category,
        content: JSON.stringify(content),
        keyWord: JSON.stringify(keyWord),
        title: title,
        type: this.replyType
      }
      const fixLists = {
        category: category,
        content: JSON.stringify(content),
        id: id,
        keyWord: JSON.stringify(keyWord),
        title: title,
        type: this.replyType
      }
      console.log(lists)
      console.log(fixLists)
      if (id !== undefined) {
        console.log('xiugai')
        updataKeyWordRule(fixLists).then(res => {
          console.log(res)
          window.location.reload()
        })
      } else {
        addKeyWordRule(lists).then(res => {
          console.log(res)
          window.location.reload()
        })
      }
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

  a,
  button {
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
    margin-top: 40px;
    margin-bottom: 30px;
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

  .search {
    float: left;
    font-size: 14px;
  }

  .input-right {
    display: table;
    width: 93%;
    position: relative;
  }

  .search-icon {
    padding: 0;
    font-size: 0;
    line-height: 38px;
    right: 0;
    position: absolute;
    top: 0;
    bottom: 0;
    width: auto;
    text-align: right;
    z-index: 1;
  }

  .search-icon button {
    display: inline-block;
    width: 36px;
    vertical-align: middle;
    border-width: 0;
    background-color: transparent;
    cursor: pointer;
    background: none;
    border: 0;
    color: inherit;
    font: inherit;
    line-height: normal;
    overflow: visible;
  }

  .input-right input {
    height: 36px;
    display: table-cell;
    width: 100%;
    padding: 7px 46px 7px 10px;
    box-sizing: border-box;
    background: #FFFFFF;
    border: 1px solid #E4E8EB;
    border-radius: 3px;
    font-size: 14px;
    color: #353535;
  }

  .add-raply {
    float: right;
  }

  .add-raply button {
    background-color: #07C160;
    border-color: #07C160;
    color: #FFFFFF;
    display: inline-block;
    padding: 0 22px;
    min-width: 54px;
    line-height: 35px;
    vertical-align: middle;
    text-align: center;
    border-radius: 3px;
    font-size: 14px;
    cursor: pointer;
    border-width: 1px;
    border-style: solid;
    box-sizing: content-box;
    margin-bottom: 20px;
  }

  .reply-table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
  }

  .reply-table a {
    text-decoration: none;
    color: #576B95;
  }

  .reply-table thead {
    background-color: #F6F8F9;
    color: #9A9A9A;
  }

  .reply-table thead th {
    padding: 18.8px 10px;
    font-weight: 400;
    font-size: 14px;
  }

  .reply-table thead th:nth-child(1) {
    padding-left: 20px;
    text-align: left;
  }

  .reply-table thead th:nth-child(4) {
    padding-right: 20px;
    text-align: right;
  }

  .reply-table tbody td {
    border-bottom: 1px solid #E4E8EB;
    padding: 18.8px 10px;
    font-size: 14px;
  }

  .reply-table tbody td:nth-child(1) {
    width: 367px;
    padding-left: 20px;
    text-align: left;
  }

  .reply-table tbody td:nth-child(2) {
    width: 218px;
    text-align: left;
  }

  .reply-table tbody td:nth-child(4) {
    width: 164px;
    padding-right: 20px;
    text-align: right;
  }

  .operation-link {
    display: inline-block;
    float: left;
    vertical-align: middle;
    margin-right: 0;
    margin-left: 14px;
  }

  .delete-sec {
    position: relative;
  }

  .delete-rule {
    display: none;
    width: 280px;
    position: absolute;
    z-index: 500;
    text-align: left;
    color: #353535;
    line-height: 1.6;
    white-space: normal;
    word-wrap: break-word;
    top: 100%;
    padding-top: 16px;
    left: 50%;
    transform: translateX(-50%);
  }

  .delete-inner {
    position: relative;
    padding: 24px;
    box-sizing: border-box;
    background: #FFFFFF;
    box-shadow: 0 1px 20px 0 rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    text-align: left;
    color: #353535;
    line-height: 1.6;
    white-space: normal;
  }

  .delete-inner::before {
    left: 50%;
    margin-left: -4px;
    top: -4px;
    content: " ";
    width: 8px;
    height: 8px;
    background-color: #FFFFFF;
    box-shadow: 0 -10px 15px 0 #D4D4D4;
    transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    position: absolute;
  }

  .delete-rule-btn {
    margin-top: 24px;
    text-align: center;
  }

  .delete-rule-btn button {
    margin: 0 7px;
    background-color: #07C160;
    border-color: #07C160;
    color: #FFFFFF;
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

  #delete-btn-cancle {
    background-color: #FBFBFB;
    border-color: #E4E8EB;
    color: #353535;
  }

  /* 添加回复操作页面 */
  .add-form {
    font-size: 14px;
    padding-right: 100px;
    max-width: 90%;
    margin: 0 auto;
  }

  .add-form-input {
    margin-bottom: 30px;
  }

  .add-form-input label {
    width: 4em;
    float: left;
    margin: 8.8px 30px 0 0;
  }

  .add-input-area {
    display: table-cell;
    width: 1%;
    word-wrap: break-word;
    word-break: break-all;
  }

  .add-input-area span {
    display: table;
    width: 100%;
    position: relative;
  }

  .add-input-area span input {
    height: 36px;
    display: table-cell;
    width: 100%;
    padding: 0.48571429em 10px;
    box-sizing: border-box;
    background: #FFFFFF;
    border: 1px solid #E4E8EB;
    border-radius: 3px;
    line-height: 36px;
  }

  .add-input-area p {
    padding-top: 10px;
    color: #9A9A9A;
    line-height: 1.6;
  }

  .add-button {
    width: auto !important;
    left: 100%;
    padding-left: 10px;
    vertical-align: middle;
    white-space: nowrap;
    position: absolute !important;
    top: 50%;
    transform: translateY(-50%);
  }

  .add-button button {
    vertical-align: middle;
    position: relative;
    border: 1px solid #E4E8EB;
    border-radius: 100%;
    background-color: #FFFFFF;
    padding: 0;
    width: 20px;
    height: 20px;
    font-size: 0;
    color: transparent;
  }

  .add-button button::before {
    content: " ";
    width: 10px;
    height: 1px;
    background-color: #9A9A9A;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -5px;
  }

  .add-button button::after {
    content: " ";
    width: 10px;
    height: 1px;
    background-color: #9A9A9A;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -5px;
    transform: matrix(0, 1, -1, 0, 0, 0);
    transform-origin: 50% 50%;
  }

  .reduce-button {
    width: auto !important;
    right: -65px;
    padding-left: 10px;
    vertical-align: middle;
    white-space: nowrap;
    position: absolute !important;
    top: 50%;
    transform: translateY(-50%);
  }

  .reduce-button button {
    vertical-align: middle;
    position: relative;
    border: 1px solid #E4E8EB;
    border-radius: 100%;
    background-color: #FFFFFF;
    padding: 0;
    width: 20px;
    height: 20px;
    font-size: 0;
    color: transparent;
  }

  .reduce-button button::before {
    content: " ";
    width: 10px;
    height: 1px;
    background-color: #9A9A9A;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -5px;
  }

  .keyword-match {
    border-right-width: 0;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    display: table-cell !important;
    width: 1% !important;
    vertical-align: middle;
    white-space: nowrap;
  }

  .keyword-match-show {
    vertical-align: middle;
    width: 12em;
    display: inline-block;
  }

  .keyword-match div dl {
    position: relative;
  }

  .keyword-match div dt {
    line-height: 24px;
    border: 1px solid #DFE3E5;
    border-right: 1px solid #FFFFFF;
    border-radius: 4px;
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
    background-color: #fff;
    position: relative;
    min-width: 120px;
    padding: 5.5px 36px 4.5px 16px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    cursor: pointer;
  }

  .keyword-match div dt::after {
    position: absolute;
    top: 50%;
    right: 8px;
    margin-top: -6px;
    content: ' ';
    display: block;
    width: 6px;
    height: 6px;
    border-width: 1px;
    border-style: solid;
    border-color: #9A9A9A #9A9A9A transparent transparent;
    transform-origin: 50% 50%;
    transform: rotate(135deg);
  }

  .match-dropdown {
    position: absolute;
    left: 0;
    right: 0;
    min-width: 128px;
    width: -webkit-fit-content;
    width: fit-content;
    background: #FFFFFF;
    box-shadow: 0 1px 20px 0 rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    background-color: #fff;
    z-index: 5000;
  }

  .match-dropdown ul {
    top: 5px;
    max-height: 370px;
    overflow-y: auto;
    top: 0px;
    left: 0;
    margin-left: 0;
    padding: 10px 0 6px 0;
  }

  .match-dropdown li {
    position: relative;
    color: #07C160;
    padding-right: 30px;
    cursor: pointer;
  }

  .match-contain {
    padding: 8px 16px;
    color: #353535;
    margin-bottom: 4px;
  }

  .reply-content {
    padding-top: 6.8px;
    display: table-cell;
    width: 1%;
    word-wrap: break-word;
    word-break: break-all;
  }

  .keywords-reply-item {
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #E4E8EB;
  }

  .media-text {
    display: inline-block;
    vertical-align: middle;
    position: relative;
    padding: 10px 0;
  }

  .add-content-area {
    display: inline-block;
    position: relative;
    padding-right: 10px;
    margin-bottom: 20px;
  }

  .add-content-area button {
    margin-right: 5px;
    position: relative;
    width: 36px;
    height: 36px;
    border: 1px solid #E4E8EB;
    border-radius: 100%;
    background-color: #FFFFFF;
    padding: 0;
    font-size: 0;
    color: transparent;
  }

  .add-content-area button::before {
    width: 16px;
    height: 2px;
    margin-left: -8px;
    content: " ";
    background-color: #9A9A9A;
    position: absolute;
    left: 50%;
    top: 50%;
  }

  .add-content-area button::after {
    width: 16px;
    height: 2px;
    margin-left: -8px;
    content: " ";
    background-color: #9A9A9A;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: matrix(0, 1, -1, 0, 0, 0);
    transform-origin: 50% 50%;
  }

  .add-content-area:hover .add-type-hide {
    display: block;
  }

  .add-type-hide {
    position: absolute;
    left: 100%;
    top: 50%;
    width: 700px;
    z-index: 500;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    background: #FFFFFF;
    box-shadow: 0 1px 20px 0 rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    display: none;
    /* visibility: hidden; */
  }

  .add-type-hide ul {
    line-height: 38px;
    background-color: #FFFFFF;
  }

  .add-type-hide ul li {
    padding: 0 15px;
    float: left;
    cursor: pointer;
  }

  .add-type-hide ul li::before {
    content: " ";
    display: inline-block;
    width: 22px;
    height: 20px;
    vertical-align: middle;
    margin: -0.2em 1px 0 0;
  }

  .add-type-hide ul li:nth-of-type(1)::before {
    background: transparent url(https://res.wx.qq.com/mpres/zh_CN/htmledition/pages/modules/msg_sender/svg/default/sender_appmsg4273fb.svg) no-repeat 0 0;
  }

  .add-type-hide ul li:nth-of-type(2)::before {
    background: transparent url(https://res.wx.qq.com/mpres/zh_CN/htmledition/pages/modules/msg_sender/svg/default/sender_text4273fb.svg) no-repeat 0 0;
  }

  .add-type-hide ul li:nth-of-type(3)::before {
    background: transparent url(https://res.wx.qq.com/mpres/zh_CN/htmledition/pages/modules/msg_sender/svg/default/sender_img4273fb.svg) no-repeat 0 0;
  }

  .add-type-hide ul li:nth-of-type(4)::before {
    background: transparent url(https://res.wx.qq.com/mpres/zh_CN/htmledition/pages/modules/msg_sender/svg/default/sender_audio4273fb.svg) no-repeat 0 0;
  }

  .add-type-hide ul li:nth-of-type(5)::before {
    background: transparent url(https://res.wx.qq.com/mpres/zh_CN/htmledition/pages/modules/msg_sender/svg/default/sender_video4273fb.svg) no-repeat 0 0;
  }

  /* 隐藏回复内容操作框 */
  .hide-dialog {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    white-space: nowrap;
    overflow: auto;
    z-index: 1000;
  }

  .hide-dialog-sec {
    display: inline-block;
    text-align: left;
    vertical-align: middle;
    margin: 40px;
    white-space: normal;
    -webkit-border-radius: 4px;
    border-radius: 4px;
    background-color: #FFFFFF;
    -webkit-box-shadow: 0 1px 20px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 1px 20px 0 rgba(0, 0, 0, 0.1);
    max-width: 980px;
    min-width: 600px;
    box-sizing: border-box;
  }

  .hide-dialog-head {
    position: relative;
    overflow: hidden;
    padding: 0 32px;
    line-height: 72px;
    height: 72px;
  }

  .hide-dialog-sec h3 {
    font-weight: 400;
    font-size: 16px;
    line-height: 72px;
  }

  .hide-dialog-sec button {
    vertical-align: middle;
    display: inline-block;
    cursor: pointer;
    right: 32px;
    top: 50%;
    overflow: hidden;
    box-sizing: content-box;
  }

  .hide-btn-common {
    padding: 0;
    border-width: 0;
    background-color: transparent;
    position: absolute;
    width: 18px;
    height: 18px;
    margin-top: -9px;
    line-height: 18px;
  }

  .hide-dialog-sec svg {
    fill: #9B9B9B;
  }

  .dialog-body-top {
    position: relative;
    overflow: hidden;
    padding: 24px 32px;
    border-bottom: 1px solid #E4E8EB;
  }

  .body-top-search {
    float: left;
    display: inline-block;
    vertical-align: middle;
    margin-right: 14px;
  }

  .top-search-input {
    display: table;
    width: 100%;
    position: relative;
  }

  .top-search-input span {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: auto;
    text-align: right;
    padding: 0;
    font-size: 0;
    line-height: 1.6;
  }

  .top-search-input span button {
    display: inline-block;
    width: 36px;
    vertical-align: middle;
    border-width: 0;
    background-color: transparent;
    background: none;
    border: 0;
    color: inherit;
    font: inherit;
    line-height: normal;
    overflow: visible;
    float: right;
    right: 0;
  }

  .top-search-input input {
    padding: 6.8px 46px 6.8px 10px;
    height: 36px;
    display: table-cell;
    width: 100%;
    box-sizing: border-box;
    background: #FFFFFF;
    border: 1px solid #E4E8EB;
    border-radius: 3px;
  }

  .new-build button {
    background-color: #07C160;
    border-color: #07C160;
    color: #FFFFFF;
    padding: 9px 22px;
    min-width: 54px;
    text-align: center;
    border-radius: 3px;
    font-size: 14px;
    cursor: pointer;
    box-sizing: content-box;
    top: 40% !important;
  }

  .dialog-body-main {
    height: 365px;
  }

  .dialog-body-main p {
    height: 100%;
    text-align: center;
  }

  .dialog-body-main p::after {
    content: " ";
    display: inline-block;
    vertical-align: middle;
    width: 0;
    height: 100%;
    overflow: hidden;
  }

  .hide-dialog-select {
    position: relative;
    width: 100%;
    padding: 24px 0 20px 0;
    text-align: center;
    display: inline-block;
    overflow: hidden;
  }

  .hide-select-btn {
    background-color: #07C160;
    border-color: #07C160;
    color: #ffffff;
    margin: 0 9px;
    padding: 0 22px;
    min-width: 54px;
    height: 33.6px;
    text-align: center;
    text-decoration: none;
    border-radius: 3px;
    font-size: 14px;
    border-width: 1px;
    border-style: solid;
  }

  .hide-cancel-btn {
    background-color: #FBFBFB;
    border-color: #E4E8EB;
    color: #353535;
  }

  .hide-imtx-dialog .hide-dialog-sec {
    width: 690px;
  }

  .hide-text-dialog .hide-dialog-sec {
    width: 800px;
  }

  .hide-text-dialog .hide-dialog-body {
    padding: 50px 80px;
  }

  .text-editor-sec {
    position: relative;
    border: 1px solid #E4E8EB;
  }

  .editor-area {
    padding: 14px 20px;
    outline: 0;
    color: #353535;
    word-wrap: break-word;
    background-color: #FFFFFF;
    height: 188px;
    overflow-y: auto;
  }

  .editor-toolbar {
    padding: 0 20px;
    line-height: 36px;
    background-color: #FFFFFF;
    border-top: 1px solid #E4E8EB;
  }

  .left-emotion {
    display: inline-block;
    vertical-align: middle;
    position: relative;
    font-size: 14px;
  }

  .left-emotion:hover .emotions {
    overflow-y: hidden;
    display: block;
  }

  .left-emotion a {
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

  .left-emotion a i {
    background: transparent url(https://res.wx.qq.com/mpres/zh_CN/htmledition/pages/modules/reply/images/icon_emotion4510e1.svg) no-repeat 0 0;
    width: 20px;
    height: 20px;
    vertical-align: middle;
    display: inline-block;
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

  .emotions-inner {
    position: relative;
    padding: 24px;
    box-sizing: border-box;
    background: #FFFFFF;
    box-shadow: 0 1px 20px 0 rgba(0, 0, 0, 0.1);
    border-radius: 2px;
  }

  .emotions-inner::before {
    position: absolute;
    left: 35px;
    top: -4px;
    content: " ";
    width: 8px;
    height: 8px;
    background-color: #FFFFFF;
    box-shadow: 0 -10px 15px 0 #D4D4D4;
    transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
  }

  .emotions-inner ul {
    overflow: hidden;
    position: relative;
    z-index: 1;
  }

  .emotions-inner ul li {
    float: left;
    width: 24px;
    height: 24px;
    line-height: 24px;
    font-size: 0;
    text-align: center;
    background-color: #FFFFFF;
  }

  .emotions-inner ul li span {
    font-size: 16px;
    cursor: pointer;
    width: 20px;
    height: 20px;
    vertical-align: middle;
    display: inline-block;
    background-size: 20px auto;
  }

  .right-toolbar {
    float: right;
    color: #9A9A9A;
  }

  .right-toolbar em {
    font-style: normal;
    margin: 0 3px;
  }

  /* 底部回复方式 */
  .reply-way {
    display: table-cell;
    width: 1%;
    word-wrap: break-word;
    word-break: break-all;
  }

  .reply-way label {
    width: auto !important;
    display: inline-block;
    vertical-align: middle;
    margin-right: 30px;
    cursor: pointer;
  }

  .reply-way label a i {
    border-width: 5px;
    border-color: #07C160;
    border-radius: 50%;
    display: inline-block;
    vertical-align: middle;
    width: 16px;
    height: 16px;
    margin-right: 5px;
    border: 1px solid #C9CDD3;
    box-sizing: border-box;
    overflow: hidden;
    background-color: #FFFFFF;
    font-size: 0;
  }

  .reply-way label span {
    vertical-align: middle;
  }

  .reply-btn {
    margin: 0 10px;
    padding: 0 35px;
    cursor: pointer;
  }
</style>
