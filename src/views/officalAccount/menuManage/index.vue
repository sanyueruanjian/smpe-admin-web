<template>
  <div class="select-main">
    <div class="main">
      <!-- 头部部分 -->
      <div class="head">
        <h2>自定义菜单</h2>
      </div>
      <!-- 中间核心部分 -->
      <div class="mid">
        <div class="mid-inside">
          <!-- 内部第一行 -->
          <div class="mid-top">
            <div class="top-pic" />
            <p class="title">菜单编辑中</p>
            <p class="info">
              菜单未发布，请确认菜单编辑完成后点击"保存并发布"同步到手机。若停用菜单，请<a>点击这里</a>
            </p>
          </div>
          <!-- 主要内容部分 -->
          <div class="mid-main">
            <!-- 内容左侧部分 -->
            <div class="preview">
              <div class="preview-area">
                <div class="pr-title">三月软件</div>
                <div>
                  <ul id="pr-bottom" class="pr-bottom">
                    <li v-for="(childList, index) in tabbar.button" :key="index" class="bot-list">
                      <a
                        :class="index === butFlag && subFlag === -1 ? 'click-status' : ''"
                        class="pr-bot-list"
                        @click="chang(index, -1,childList.sub_button.length)"
                      >
                        <i id="pr-bot-icon" :class="childList.sub_button.length === 0?'hide':''" class="pr-bot-icon" />
                        <span>{{ childList.name }}</span>
                      </a>
                      <!-- 隐藏浮框 -->
                      <div v-if="index === butFlag" class="pr-hide">
                        <ul>
                          <li v-for="(list, chidIndex) in childList.sub_button" :key="chidIndex">
                            <a
                              class="child-list"
                              :class="index === butFlag && subFlag === chidIndex ? 'child-click-status' : ''"
                              @click="chang(index, chidIndex)"
                            >
                              <span>{{ list.name }}</span>
                            </a>
                          </li>
                          <li v-if="childList.sub_button.length < 5" @click="addChild()">
                            <a>
                              <span>
                                <i />
                              </span>
                            </a>
                          </li>
                        </ul>
                        <i class="triangle-out" />
                        <i class="triangle-in" />
                      </div>
                    </li>
                    <li v-if="tabbar.button.length < 3" id="add-bot-list" class="bot-list" style="display: block;" @click="addBot()">
                      <a class="pr-bot-list">
                        <i class="pr-bot-add" />
                        <span />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="sort">
                <a class="sort-btn btn">菜单排序</a>
              </div>
            </div>
            <!-- 内容右侧部分 -->
            <div id="form-area" class="form-area">
              <!-- 内容右侧，点击下部菜单显示部分 -->
              <div id="bot-area">
                <div class="form-top">
                  <h4 v-if="tabbar.button.length != 0" id="bot-title">{{ tabbar.button[0].name }}</h4>
                  <div class="delete-menu">
                    <a @click="deleteMenu()">删除菜单</a>
                  </div>
                </div>
                <div class="main-menu-set">
                  <div class="menu-info">已添加子菜单，仅可设置菜单名称。</div>
                  <div class="menu-set">
                    <div class="menu-name">菜单名称</div>
                    <div class="menu-name-control">
                      <span>
                        <input
                          v-if="tabbar.button.length != 0"
                          id="set-bot-name"
                          type="text"
                          :value="butFlag == -1?tabbar.button[0].name:tabbar.button[butFlag].name"
                          @blur="newValue()"
                        >
                      </span>
                      <p style="display: none;">字数超过上限</p>
                      <p style="display: none;">请输入菜单名称</p>
                      <p>仅支持中英文和数字，字数不超过4个汉字或8个字母</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 内容右侧，点击下部菜单显示部分 -->
              <div id="child-area" style="display: none;">
                <div class="form-top">
                  <h4 id="child-title">三月历史</h4>
                  <div class="delete-menu">
                    <a id="delete-menu-word" @click="deleteMenu()">删除子菜单</a>
                    <!-- <a v-if="tabbar.button.sub_button == 0" @click="deleteMenu()">删除菜单</a> -->
                  </div>
                </div>
                <div class="child-menu">
                  <div class="menu-set">
                    <div class="menu-set-name">子菜单名称</div>
                    <div class="menu-name-control">
                      <span>
                        <input id="set-child-name" type="text" @blur="newValue()">
                      </span>
                      <p style="display: none;">字数超过上限</p>
                      <p style="display: none;">请输入菜单名称</p>
                      <p>仅支持中英文和数字，字数不超过8个汉字或16个字母</p>
                    </div>
                  </div>
                  <div class="menu-select">
                    <div class="menu-set-name">子菜单内容</div>
                    <div class="selects">
                      <form>
                        <div v-for="(na,index) in select" :key="index" class="select-cell" @click="selectI(index+1)">
                          <label>
                            <input v-if="index != 0" id="radio" name="status" type="radio">
                            <input v-if="index === 0" id="radio" checked="checked" name="status" type="radio">
                            <!-- <i :class="selectI" id="index-i"></i> -->
                            <span>{{ na.name }}</span>
                          </label>
                        </div>
                      </form>
                    </div>
                  </div>

                  <div class="child-menu-container">
                    <!-- 点击发送消息显示部分 -->
                    <div>
                      <div class="send-message" :class="selcetStatus === 0?'':'hide'">
                        <div class="send-top">
                          <div class="send-nav">
                            <ul>
                              <li>
                                <a>
                                  <div class="send-icon">
                                    <svg
                                      width="22"
                                      height="20"
                                      viewBox="0 0 22 20"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M2.5 3h17A1.5 1.5 0 0 1 21 4.5v12a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 1 16.5v-12A1.5 1.5 0 0 1 2.5 3zM2 4v13h18V4H2zm2 1h14v7H4V5zm1 1v5h12V6H5zm-1 7h14v1H4v-1zm0 2h9v1H4v-1z"
                                        fill="#07C160"
                                        fill-rule="evenodd"
                                      /></svg>
                                  </div>
                                  <span>图文消息</span>
                                </a>
                              </li>
                              <li>
                                <a>
                                  <div class="send-icon">
                                    <svg
                                      width="22"
                                      height="20"
                                      viewBox="0 0 22 20"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M12 6h6V4H4v2h6v11h2V6z"
                                        fill="#9A9A9A"
                                        fill-rule="evenodd"
                                      /></svg>
                                  </div>
                                  <span>文字</span>
                                </a>
                              </li>
                              <li>
                                <a>
                                  <div class="send-icon">
                                    <svg
                                      width="22"
                                      height="20"
                                      viewBox="0 0 22 20"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <g fill="#9A9A9A" fill-rule="evenodd">
                                        <path d="M2.5 3h17A1.5 1.5 0 0 1 21 4.5v12a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 1 16.5v-12A1.5 1.5 0 0 1 2.5 3zM2 4v13h18V4H2z" />
                                        <path d="M20 13.8L15.5 9l-3.044 3.247L7.5 7 2 12.824v1L7.5 8l4.956 5.247L15.5 10l4.5 4.8v-1z" />
                                      </g>
                                    </svg>
                                  </div>
                                  <span>图片</span>
                                </a>
                              </li>
                              <li>
                                <a>
                                  <div class="send-icon">
                                    <svg
                                      width="22"
                                      height="20"
                                      viewBox="0 0 22 20"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <g fill="#9A9A9A" fill-rule="evenodd">
                                        <path
                                          d="M20 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0zM3 10a8 8 0 1 0 16 0 8 8 0 0 0-16 0z"
                                          fill-rule="nonzero"
                                        />
                                        <path d="M11.908 14.978l-.857-.857A5.74 5.74 0 0 0 12.8 9.979a5.742 5.742 0 0 0-1.664-4.06l.857-.856A6.973 6.973 0 0 1 14 9.98a6.972 6.972 0 0 1-2.092 4.999zm-2-2l-.858-.858A2.87 2.87 0 0 0 10 9.979c0-.81-.331-1.541-.863-2.06l.857-.857A4.101 4.101 0 0 1 11.2 9.979a4.1 4.1 0 0 1-1.292 2.999zm-1.862-1.863c.337-.26.554-.672.554-1.136 0-.421-.179-.799-.463-1.06l-1.144 1.144 1.053 1.052z" />
                                      </g>
                                    </svg>
                                  </div>
                                  <span>音频</span>
                                </a>
                              </li>
                              <li>
                                <a>
                                  <div class="send-icon">
                                    <svg
                                      width="22"
                                      height="20"
                                      viewBox="0 0 22 20"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M1.5 3h12A1.5 1.5 0 0 1 15 4.5v10.944a1.5 1.5 0 0 1-1.5 1.5h-12a1.5 1.5 0 0 1-1.5-1.5V4.5A1.5 1.5 0 0 1 1.5 3zM1 4v12h13V4H1zm16 8.46v-6l3.375-2.7A1 1 0 0 1 22 4.54v9.84a1 1 0 0 1-1.625.78L17 12.46zm1-.143l3 2.143v-10l-3 2.143v5.714z"
                                        fill="#9A9A9A"
                                        fill-rule="evenodd"
                                      /></svg>
                                  </div>
                                  <span>视频</span>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <!-- 点击发送消息内容部分 -->
                        <div>
                          <!-- 图文消息部分 -->
                          <div class="send-main" style="display: none;">
                            <div class="info-select-list">
                              <div class="info-select-cell">
                                <a>
                                  <i class="select-source" />
                                  <strong>从素材库选择</strong>
                                </a>
                              </div>
                              <div class="info-select-cell">
                                <a>
                                  <i class="create-info" />
                                  <strong>自建图文</strong>
                                </a>
                              </div>
                              <div class="info-select-cell">
                                <a>
                                  <i class="reprint-article" />
                                  <strong>转载文章</strong>
                                </a>
                              </div>
                            </div>
                          </div>
                          <!-- 文字部分 -->
                          <div class="word-main" style="display: none;">
                            <div class="write-word-sec" contenteditable="true" />
                            <div class="write-bottom">
                              <button>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="18"
                                  height="18"
                                  viewBox="0 0 18 18"
                                >
                                  <path fill="#4A4A51" d="M9 0a9 9 0 1 1 0 18A9 9 0 0 1 9 0zm.426 1C4.526 1 .9 4.582.9 9.421.9 13.418 4.526 17 9.426 17c4.048 0 7.674-3.582 7.674-7.579C17.1 4.581 13.474 1 9.426 1zM15 10c-.337 2.978-2.415 5-5.538 5C5.415 15 3.337 12.978 3 10h12zm-2.5-5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-7 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" />
                                </svg>
                              </button>
                              <p>
                                还可以输入<em>300</em>字
                              </p>
                              <div class="emotion" style="display: none;">
                                <ul>
                                  <li v-for="(count,index) in 112" :key="index">
                                    <span :style="{backgroundPositionX: 0+'px',backgroundPositionY:-(count-1)*20+'px'}" />
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <!-- 图片部分 -->
                          <div class="send-main" style="display: none;">
                            <div class="info-select-list">
                              <div class="info-select-cell">
                                <a>
                                  <i class="select-source" />
                                  <strong>从素材库选择</strong>
                                </a>
                              </div>
                              <div class="info-select-cell">
                                <a>
                                  <i class="load-image" />
                                  <strong>上传图片</strong>
                                </a>
                              </div>
                            </div>
                          </div>
                          <!-- 音频部分 -->
                          <div class="send-main" style="display: none;">
                            <div class="info-select-list">
                              <div class="info-select-cell">
                                <a>
                                  <i class="select-source" />
                                  <strong>从素材库选择</strong>
                                </a>
                              </div>
                              <div class="info-select-cell">
                                <a>
                                  <i class="load-audio" />
                                  <strong>上传音频</strong>
                                </a>
                              </div>
                            </div>
                          </div>
                          <!-- 视频部分 -->
                          <div class="send-main">
                            <div class="info-select-list">
                              <div class="info-select-cell">
                                <a>
                                  <i class="select-source" />
                                  <strong>从素材库选择</strong>
                                </a>
                              </div>
                              <div class="info-select-cell">
                                <a>
                                  <i class="load-video" />
                                  <strong>新建视频</strong>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- 点击跳转网页显示部分 -->
                    <div class="url" :class="selcetStatus === 1?'':'hide'">
                      <form>
                        <p class="goto-info">订阅者点击该子菜单会跳到以下链接</p>
                        <div class="goto-control">
                          <label>页面地址</label>
                          <div class="input-control">
                            <span class="goto-input">
                              <input id="get-url" placeholder="请输入公众号相关链接" type="text" @blur="getUrl()">
                            </span>
                            <p class="goto-warning" style="display: none;">请勿添加其他公众号的主页链接</p>
                            <p class="goto-from" style="display: none;">
                              来自
                              <span>
                                -《<span />》
                              </span>
                            </p>
                          </div>
                        </div>
                        <div class="goto-tip">
                          <div>
                            <p class="goto-noactical" style="display: none;">
                              <span>请选择一篇文章</span>
                            </p>
                            <a class="select-info" style="display: none;">从公众号图文消息中选择</a>
                            <a class="select-again" style="display: none;">重新选择</a>
                          </div>
                        </div>
                      </form>
                    </div>
                    <!-- 点击跳转小程序显示部分 -->
                    <div class="jump" :class="selcetStatus === 2?'':'hide'">
                      <form>
                        <p class="goto-info">订阅者点击该子菜单会跳到以下小程序</p>
                        <div class="goto-control">
                          <label class="jump-control">小程序</label>
                          <a class="select-again">选择小程序</a>
                        </div>
                        <div class="goto-control">
                          <label>备用网页</label>
                          <div class="input-control">
                            <span class="goto-input">
                              <input type="text">
                            </span>
                          </div>
                        </div>
                        <div class="goto-tip">
                          <div>
                            <a class="jump-info select-info">旧版微信客户端无法支持小程序，用户点击菜单时将会打开备用网页。</a>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <span class="out-arrow">
                <i class="form-arrow-out" />
                <i class="form-arrow-in" />
              </span>
            </div>
          </div>
          <!-- 下部按钮 -->
          <div class="bottom">
            <div class="bot-btn">
              <a class="save-btn btn" @click="collect()">保存并发布</a>
              <a class="preview-btn btn">预览</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {
  getMenu,
  addMenu
} from '../../../api/officalAccount/request.js'

export default {
  data() {
    return {
      butFlag: -1,
      subFlag: -1,
      selcetStatus: 1,
      tabbar: {
        'button': []
      },
      select: [
        // { 'name': '发送消息' },
        { 'name': '跳转网页' }
        // { 'name': '跳转小程序' }
      ]
    }
  },
  created() {
    const _this = this
    getMenu().then((res) => {
      if (res.data == null) {
        _this.tabbar = {
          'button': [
            {
              'name': '菜单名称',
              'sub_button': [
                {
                  'type': 'view',
                  'name': '子菜单名称'
                  // 'key': 'rselfmenu_0_0'
                  // "sub_button": [ ]
                }
              ]
            }
          ]
        }
      } else if (res.data != null) {
        _this.tabbar = res.data
      }
    })
  },
  mounted() {
    document.getElementById('form-area').style.display = 'none'
  },
  methods: {
    // 点击底部栏目改变
    chang(butFlag, subFlag, childLength) {
      this.butFlag = butFlag
      this.subFlag = subFlag
      document.getElementById('form-area').style.display = 'block'
      document.getElementById('radio').checked = 'checked'
      // this.selcetStatus = 0
      const title = document.getElementById('bot-title')
      const childTitle = document.getElementById('child-title')
      // 当底部栏目没有子菜单时点击事件
      if (butFlag !== -1 && subFlag === -1 && childLength === 0) {
        console.log('执行1')
        document.getElementById('bot-area').style.display = 'none'
        document.getElementById('child-area').style.display = 'block'
        childTitle.innerHTML = this.tabbar.button[butFlag].name
        document.getElementById('set-child-name').value = this.tabbar.button[butFlag].name
        document.getElementById('delete-menu-word').innerHTML = '删除菜单'

        // ==========================================
        // document.getElementById('get-url').value = this.tabbar.button[this.butFlag].url

        if (this.tabbar.button[this.butFlag].url !== undefined) {
          document.getElementById('get-url').value = this.tabbar.button[this.butFlag].url
        } else {
          document.getElementById('get-url').value = ''
        }
      }
      // 当底部栏目有子菜单时点击事件
      if (butFlag !== -1 && subFlag === -1 && childLength !== 0) {
        console.log('执行2')
        document.getElementById('child-area').style.display = 'none'
        document.getElementById('bot-area').style.display = 'block'
        title.innerHTML = this.tabbar.button[butFlag].name
        document.getElementById('set-bot-name').value = this.tabbar.button[butFlag].name
        document.getElementById('delete-menu-word').innerHTML = '删除子菜单'
      }
      // 当点击子菜单时事件
      if (subFlag !== -1) {
        document.getElementById('bot-area').style.display = 'none'
        document.getElementById('child-area').style.display = 'block'
        childTitle.innerHTML = this.tabbar.button[butFlag].sub_button[subFlag].name
        document.getElementById('set-child-name').value = this.tabbar.button[butFlag].sub_button[subFlag].name

        if (this.tabbar.button[this.butFlag].sub_button[this.subFlag].url !== undefined) {
          document.getElementById('get-url').value = this.tabbar.button[this.butFlag].sub_button[this.subFlag].url
        } else {
          document.getElementById('get-url').value = ''
        }
      }
    },
    // 删除菜单操作
    deleteMenu() {
      if (this.butFlag === -1) {
        this.tabbar.button.splice(0, 1)
      } else if (this.butFlag !== -1 && this.subFlag === -1) {
        this.tabbar.button.splice(this.butFlag, 1)
      } else if (this.butFlag !== -1 && this.subFlag !== -1) {
        // 删除子菜单的时候进行监听，监听是否目前主菜单已经没有了子菜单
        this.tabbar.button[this.butFlag].sub_button.splice(this.subFlag, 1)
        if (this.tabbar.button[this.butFlag].sub_button.length === 0) {
          this.tabbar.button[this.butFlag].key = 'V1001_TODAY_MUSIC'
          this.tabbar.button[this.butFlag].type = 'click'
        }
        console.log(this.tabbar)
      }
      this.butFlag = -1
      document.getElementById('form-area').style.display = 'none'
    },
    // 添加底部栏目操作
    addBot() {
      const list = document.getElementsByClassName('bot-list')
      const _this = this
      // 当栏目单元还有2个的时候，向tabbar中添加元素
      if (list.length === 3) {
        document.getElementById('form-area').style.display = 'block'
        document.getElementById('bot-area').style.display = 'none'
        document.getElementById('add-bot-list').style.display = 'none'
        document.getElementById('child-area').style.display = 'block'
        _this.tabbar.button.push({
          'type': 'click',
          'name': '菜单名称',
          'key': 'V1001_TODAY_MUSIC',
          'sub_button': []
        })
        const title = document.getElementById('child-title')
        title.innerHTML = '菜单名称'
        document.getElementById('set-child-name').value = '菜单名称'
        document.getElementById('get-url').value = ''
      } else if (list.length <= 2) {
        document.getElementById('form-area').style.display = 'block'
        document.getElementById('bot-area').style.display = 'none'
        document.getElementById('child-area').style.display = 'block'
        _this.tabbar.button.push(
          {
            'type': 'click',
            'name': '菜单名称',
            'key': 'V1001_TODAY_MUSIC',
            'sub_button': []
          })
        const title = document.getElementById('child-title')
        title.innerHTML = '菜单名称'
        document.getElementById('set-child-name').value = '菜单名称'
        document.getElementById('get-url').value = ''
      }
    },
    // 添加子菜单操作
    addChild() {
      this.tabbar.button[this.butFlag]
      // let _this = this;
      delete this.tabbar.button[this.butFlag].type

      this.tabbar.button[this.butFlag].sub_button.push({
        'type': 'click',
        'name': '子菜单名称',
        'key': 'V1001_GOOD'
      })
      const title = document.getElementById('child-title')
      title.innerHTML = '子菜单名称'
      document.getElementById('set-child-name').value = '子菜单名称'
      document.getElementById('get-url').value = ''
    },
    newValue() {
      const childList = document.getElementsByClassName('child-list')
      const newValue = document.getElementById('set-bot-name').value
      const newChildValue = document.getElementById('set-child-name').value
      const title = document.getElementById('bot-title')
      const childTitle = document.getElementById('child-title')
      if (document.getElementById('set-bot-name').value === '') {
        alert('不能输入为空')
      } else if (document.getElementById('set-child-name').value === '') {
        alert('不能输入为空')
      } else {
        // 点击底部栏目并且有子菜单的时候
        if (this.butFlag !== -1 && childList.length !== 0) {
          this.tabbar.button[this.butFlag].name = newValue
          title.innerHTML = newValue
        }
        if (this.butFlag !== -1 && childList.length === 0) {
          this.tabbar.button[this.butFlag].name = newChildValue
          childTitle.innerHTML = newChildValue
        }
        if (this.subFlag !== -1) {
          this.tabbar.button[this.butFlag].sub_button[this.subFlag].name = newChildValue
          childTitle.innerHTML = newChildValue
        }
      }
    },
    // 获取当前配置的网页
    getUrl() {
      const url = document.getElementById('get-url').value
      // 当选择底部栏目的时候
      if (this.subFlag === -1 && this.butFlag !== -1) {
        if (url === '') {
          this.tabbar.button[this.butFlag].type = 'click'
          this.tabbar.button[this.butFlag].key = 'V1001_GOOD'
          delete this.tabbar.button[this.butFlag].url
        } else {
          console.log(this.tabbar.button[this.butFlag])
          this.tabbar.button[this.butFlag].type = 'view'
          this.tabbar.button[this.butFlag].url = url
          delete this.tabbar.button[this.butFlag].key
        }
      }
      // 当选择子栏目的时候
      if (this.subFlag !== -1) {
        if (url === '') {
          this.tabbar.button[this.butFlag].sub_button[this.subFlag].type = 'click'
          this.tabbar.button[this.butFlag].sub_button[this.subFlag].key = 'V1001_GOOD'
          delete this.tabbar.button[this.butFlag].sub_button[this.subFlag].url
        } else {
          this.tabbar.button[this.butFlag].sub_button[this.subFlag].type = 'view'
          this.tabbar.button[this.butFlag].sub_button[this.subFlag].url = url
          delete this.tabbar.button[this.butFlag].sub_button[this.subFlag].key
        }
      }
    },
    // 收集、封装数据，提交数据
    collect() {
      const tabbar = JSON.stringify(this.tabbar)
      addMenu({ menu: tabbar }).then(res => {
        this.$message.success('添加成功')
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

    a {
        cursor: pointer;
    }

    .hide {
        display: none !important;
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

    .head {
        margin-top: 40px;
        margin-bottom: 40px;
    }

    .head h2 {
        font-size: 26px;
        font-weight: 400;
        line-height: 1;
        margin-bottom: 20px;
    }

    .mid {
        display: inline-block;
        width: 1080px;
        margin-bottom: 30px;
        padding: 24px 40px;
        background-color: #fff;
        box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.05);
        border-radius: 3px;
    }

    .mid-inside {
        padding: 16px 0;
    }

    /* 中部头部部分 */
    .mid-top {
        padding-top: 14px;
        margin-bottom: 40px;
        position: relative;
        padding: 15px 30px;
        background-color: #f4f5f9;
    }

    .top-pic {
        width: 32px;
        height: 32px;
        margin-top: 5px;
        margin-right: 15px;
        float: left;
        background: url(../../../assets/officalAccount/base_z49d030.png) 0 -1028px no-repeat;
    }

    .title {
        color: #353535;
        font-size: 14px;
        margin-bottom: 3px;
    }

    .info {
        color: #9a9a9a;
        font-size: 14px;
    }

    /* 主要内容部分 */
    .mid-main {
        margin: 14px 30px 0;
        background-color: #FFFFFF;
    }

    /* 主要内容左侧部分 */
    ul {
        list-style: none;
    }

    .preview {
        position: relative;
        display: inline-block;
        margin-right: 12px;
        float: left;
    }

    .preview-area {
        position: relative;
        width: 294px;
        height: 580px;
        border: 1px solid #e7e7eb;
        background: url(https://res.wx.qq.com/mpres/htmledition/images/bg/bg_mobile_head_default49d02c.png) no-repeat;
        background-position: 0 0;
        background-size: contain;
    }

    .pr-title {
        color: #fff;
        text-align: center;
        padding-top: 30px;
        font-size: 15px;
        width: auto;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
        margin: 0 30px;
    }

    .pr-bottom {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        border-top: 1px solid #e7e7eb;
        background: transparent url(https://res.wx.qq.com/mpres/htmledition/images/bg/bg_mobile_foot_default49d02c.png) no-repeat 0 0;
        background-position: 0 0;
        background-repeat: no-repeat;
        padding-left: 43px;
        height: 50px;
        display: flex;
        flex-wrap: wrap;
        align-content: flex-center;
        align-items: center;
        justify-content: space-around;
    }

    .pr-bottom li {
        flex: 1;
        line-height: 50px;
        position: relative;
        text-align: center;
        height: 100%;
        font-size: 14px;
    }

    .pr-bot-list {
        display: flex;
        height: 100%;
        justify-content: center;
        align-items: center;
        border-left: 1px solid #e7e7eb;
    }
    .pr-bot-list span {
        flex: 1;
        line-height: 15px !important;
        max-width: 70px;
        display:inline-block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .pr-bot-list i {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .click-status {
        display: flex;
        border: 1px solid #07c160;
        line-height: 48px;
        background-color: #fff;
        color: #07c160;
    }

    .child-click-status {
        display: block;
        border: 1px solid #07c160;
        line-height: 43px;
        background-color: #fff;
        color: #07c160 !important;
    }

    .pr-bot-icon {
        background: url(../../../assets/officalAccount/index_z49d030.png) 0 -36px no-repeat;
        width: 7px;
        height: 7px;
        vertical-align: middle;
        display: inline-block;
        margin-left: 5px;
        margin-top: -2px;
    }
    #add-bot-list span {
        flex: 0;
    }
    .pr-bot-add {
        background: url(../../../assets/officalAccount/index_z49d030.png) 0 0 no-repeat;
        width: 14px;
        height: 14px;
        vertical-align: middle;
        display: inline-block;
        margin-top: -2px;
    }

    .pr-hide {
        display: block;
        bottom: 60px;
        background-color: #fafafa;
        border-top-width: 0;
        position: absolute;
        left: 0;
        width: 100%;
        border: 1px solid #d0d0d0;
    }

    .pr-hide li {
        line-height: 44px;
        width: 100%;
    }

    .pr-hide a {
        padding: 0 7px;
        display: flex;
        width: auto;
        color: #616161;
        justify-content: center;
    }

    .pr-hide span {
        display: block;
        width: 100%;
        border-top: 1px solid #e7e7eb;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
    }

    .pr-hide li:nth-child(1) span {
        border-top: 0px;
    }

    .pr-hide li:nth-last-child(2) span {
        border-bottom: 1px solid #e7e7eb;
    }

    .pr-hide li:nth-last-child(1) span {
        border-top: 0px;
    }

    .pr-hide ul i {
        background: url(../../../assets/officalAccount/index_z49d030.png) 0 0 no-repeat;
        width: 14px;
        height: 14px;
        vertical-align: middle;
        display: inline-block;
        margin-top: -2px;
    }

    .triangle-out {
        bottom: -6px;
        display: inline-block;
        width: 0;
        height: 0;
        border-width: 6px;
        border-style: dashed;
        border-color: transparent;
        border-bottom-width: 0;
        border-top-color: #d0d0d0;
        border-top-style: solid;
        position: absolute;
        left: 50%;
        margin-left: -6px;
    }

    .triangle-in {
        bottom: -5px;
        display: inline-block;
        width: 0;
        height: 0;
        border-width: 6px;
        border-style: dashed;
        border-color: transparent;
        border-bottom-width: 0;
        border-top-color: #fafafa;
        border-top-style: solid;
        position: absolute;
        left: 50%;
        margin-left: -6px;
    }

    .sort {
        display: block;
        position: absolute;
        left: 0;
        right: 0;
        bottom: -72px;
        text-align: center;
    }

    .btn {
        height: 30px;
        line-height: 30px;
        padding: 0 22px;
        border-radius: 3px;
        margin: 0 10px;
        font-size: 14px;
    }

    .sort-btn {
        display: inline-block;
        min-width: 60px;
        background-color: #FFFFFF;
        border: 1px solid #e7e7eb;
        color: #353535;
    }

    /* 内容右侧部分 */
    .form-area {
        position: relative;
        width: 633px;
        float: right;
        padding-left: 12px;
        padding: 0 19px 5px;
        background-color: #f4f5f9;
        border: 1px solid #e7e7eb;
        padding-bottom: 20px;
        min-height: 580px;
    }

    .form-top {
        padding: 12px 0;
        border-bottom: 1px solid #e7e7eb;
        text-align: right;
    }

    .form-top h4 {
        float: left;
        font-size: 14px;
        font-weight: 400;
    }

    .delete-menu {
        font-size: 14px;
        color: #576b95;
    }

    /* 内容右侧，点击下部主菜单显示部分 */
    .menu-info {
        padding-top: 10px;
        color: #9a9a9a;
        font-size: 14px;
    }

    .menu-set {
        display: block;
        margin-top: 30px;
        margin-bottom: 10px;
    }

    .menu-set-name {
        display: inline-block;
        float: left;
        font-size: 14px;
        margin-top: 5px;
        margin-right: 15px;
    }

    .menu-name {
        display: inline-block;
        float: left;
        font-size: 14px;
        margin-top: 5px;
        margin-right: 28px;
    }

    .menu-name-control {
        display: table-cell;
        vertical-align: top;
        float: none;
        width: auto;
        font-size: 14px;
    }

    .menu-name-control span {
        height: 30px;
        width: 228px;
        padding: 0 10px;
        padding-right: 60px;
        display: inline-block;
        line-height: 30px;
        vertical-align: middle;
        font-size: 14px;
        border: 1px solid #e7e7eb;
        background-color: #fff;
    }

    .menu-name-control input {
        border: none;
        outline: none;
        height: 22px;
        margin: 4px 0;
        width: 100%;
    }

    .menu-name-control p {
        padding-top: 6px;
        color: #fa5151;
    }

    .menu-name-control p:nth-child(4) {
        color: #9a9a9a;
    }

    /* 内容右侧，点击子菜单显示部分 */
    .menu-select {
        margin-top: 30px;
        margin-bottom: 10px;
    }

    .selects {
        display: table-cell;
        vertical-align: top;
        float: none;
        width: auto;
        padding-top: 5px;
    }

    .select-cell {
        display: inline-block;
        text-align: left;
        margin-right: 22px;
        cursor: pointer;
    }

    .select-cell input {
        color: #FFFFFF;
        width: 14px;
        height: 14px;
        vertical-align: middle;
        display: inline-block;
        margin-right: 3px;
        margin-top: -2px;
    }

    .select-cell span {
        font-size: 14px;
        position: relative;
        display: inline-block;
        top: -1.5px;
        left: 5px;
    }

    /* 点击发送消息显示部分 */
    .send-message {
        background-color: #fff;
        border: 1px solid #e7e7eb;
    }

    .send-top {
        background-color: #f6f8f9;
    }

    .send-nav {
        font-size: 14px;
    }

    .send-nav ul {
        background-color: #f6f8f9;
        line-height: 60px;
        height: 60px;
        white-space: nowrap;
    }

    .send-nav li {
        float: left;
        color: #9a9a9a;
    }

    .send-nav a {
        display: flex;
        align-items: center;
        height: 100%;
        padding: 0 22px;
        outline: 0;
    }

    .send-icon {
        position: relative;
        width: 22px;
        height: 20px;
        margin-right: 3px;
        margin-left: 2px;
    }

    .send-nav svg {
        position: absolute;
    }

    /* 点击发送消息内容部分 */
    /* 图文信息部分 */
    .send-main {
        background-color: #fff;
        min-height: 176px;
        padding: 20px;
    }

    .info-select-list {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
    }

    .info-select-cell {
        display: inline-block;
        width: 130px;
        color: #9a9a9a;
        vertical-align: top;
        margin: 0 12px;
        transition: all .3s;
        text-align: center;
    }

    .info-select-cell a {
        color: #9a9a9a;
        display: block;
        height: 100%;
        padding-top: 28px;
        padding-bottom: 34px;
        box-sizing: border-box;
    }

    .info-select-cell i {
        display: block;
        margin: 0 auto;
        width: 40px;
        height: 40px;
        margin-bottom: 5px;
    }

    .select-source {
        background: url(../../../assets/officalAccount/msg_sender_z_@all49d030.png) 0 -44px no-repeat;
    }

    .create-info {
        background: url(../../../assets/officalAccount/msg_sender_z_@all49d030.png) 0 0 no-repeat;
    }

    .reprint-article {
        background: url(../../../assets/officalAccount/msg_sender_z_@all49d030.png) 0 -88px no-repeat;
    }

    .load-image {
        background: url(../../../assets/officalAccount/msg_sender_z_@all49d030.png) 0 -220px no-repeat;
    }

    .load-audio {
        background: url(../../../assets/officalAccount/msg_sender_z_@all49d030.png) 0 -176px no-repeat;
    }

    .load-video {
        background: url(../../../assets/officalAccount/msg_sender_z_@all49d030.png) 0 -132px no-repeat;
    }

    .info-select-cell strong {
        font-size: 14px;
        font-weight: normal;
    }

    /* 文字部分 */
    .write-word-sec {
        height: 151px;
        padding: 14px 20px;
        outline: 0;
        word-wrap: break-word;
        word-break: break-all;
        background-color: #fff;
        font-weight: 400;
        font-size: 14px;
        overflow: hidden auto;
    }

    .write-bottom {
        position: relative;
        padding: 0 20px;
        height: 36px;
        line-height: 36px;
        background-color: #fff;
        border-top: 1px solid #e7e7eb;
        font-size: 14px;
    }

    .write-bottom button {
        float: left;
        margin-right: 14px;
        margin-top: 8px;
        padding: 1px;
        background: none;
        border: none;
    }

    .write-bottom svg {
        fill: #000;
    }

    .write-bottom p {
        float: right;
        color: #9a9a9a;
    }

    .write-bottom em {
        font-weight: 400;
        font-style: normal;
        margin-left: 3px;
        margin-right: 3px;
    }

    .emotion {
        position: absolute;
        width: 401px;
        top: 100%;
        left: 485.463px;
        display: block;
    }

    .emotion ul {
        list-style: none;
        border-top: 1px solid #c0bfc5;
        border-right: 1px solid #c0bfc5;
        background-color: #e7e7eb;
    }

    .emotion ul li {
        float: left;
        width: 24px;
        height: 24px;
        line-height: 24px;
        font-size: 0;
        text-align: center;
        border-bottom: 1px solid #c0bfc5;
        border-left: 1px solid #c0bfc5;
        background-color: #fff;
    }

    .emotion span {
        cursor: pointer;
        width: 20px;
        height: 20px;
        vertical-align: middle;
        display: inline-block;
        background: transparent url(../../../assets/officalAccount/icon_emotion_panel.2x4be7aa.png) no-repeat 0 0;
        background-size: 20px auto;
    }

    /* 图片部分 */
    /* 音频部分 */
    /* 视频部分 */

    /* 点击跳转网页显示部分 */
    .url {
        padding: 16px 20px;
        border: 1px solid #e7e7eb;
        background-color: #fff;
    }

    .url form {
        font-size: 14px;
    }

    .goto-info {
        padding-bottom: 10px;
        color: #9A9A9A;
    }

    .goto-control {
        margin-bottom: 10px;
    }

    .goto-control label {
        display: inline-block;
        float: left;
        font-size: 14px;
        margin-top: 6px;
        margin-right: 30px;
    }

    .input-control {
        display: table-cell;
        vertical-align: top;
        float: none;
        width: auto;
    }

    .goto-input {
        position: relative;
        top: 0px;
        left: 0px;
        height: 30px;
        width: 228px;
        padding: 0 10px;
        padding-right: 60px;
        display: inline-block;
        line-height: 30px;
        vertical-align: middle;
        font-size: 14px;
        border: 1px solid #e7e7eb;
        background-color: #fff;
    }

    .goto-input input {
        border: none;
        outline: none;
        height: 22px;
        margin: 4px 0;
        width: 100%;
    }

    .goto-warning {
        margin: 5px 0 -10px;
        color: #fa5151;
    }

    .goto-from {
        padding-top: 8px;
        color: #9a9a9a;
    }

    .goto-tip {
        margin-bottom: 10px;
        padding-left: 85px;
    }

    .goto-noactical {
        padding-top: 6px;
        color: #fa5151;
    }

    .select-info {
        display: inline-block;
        color: #576b95;
        padding-top: 3px;
    }

    .select-again {
        min-width: 60px;
        color: #353535;
        display: inline-block;
        padding: 0 22px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border: 1px solid #e7e7eb;
        border-radius: 3px;
        cursor: pointer;
        margin-left: 5px;
    }

    /* 点击跳转小程序显示部分 */
    .jump {
        padding: 16px 20px;
        border: 1px solid #e7e7eb;
        background-color: #fff;
    }

    .jump form {
        font-size: 14px;
    }

    .jump-control {
        padding-right: 8px;
    }

    .jump-info {
        color: #9a9a9a;
        padding-top: 0;
        padding-bottom: 5px;
    }

    .out-arrow {
        position: absolute;
        top: 545px;
        left: -13px;
    }

    .form-arrow-out {
        position: absolute;
        left: 0;
        display: inline-block;
        width: 0;
        height: 0;
        border-width: 12px;
        border-style: dashed;
        border-color: transparent;
        border-left-width: 0;
        border-right-color: #e7e7eb;
        border-right-style: solid;
    }

    .form-arrow-in {
        position: absolute;
        left: 1px;
        display: inline-block;
        width: 0;
        height: 0;
        border-width: 12px;
        border-style: dashed;
        border-color: transparent;
        border-left-width: 0;
        border-right-color: #f4f5f9;
        border-right-style: solid;
    }

    /* 下部按钮 */
    .bottom {
        display: flex;
        justify-content: center;
        width: 100%;
    }

    .bot-btn {
        padding-bottom: 50px;
        margin-top: 40px;
    }

    .save-btn {
        display: inline-block;
        text-align: center;
        background-color: #07c160;
        color: #FFFFFF;
        height: 30px;
        border: 1px solid #07c160;
    }

    .preview-btn {
        display: inline-block;
        min-width: 60px;
        text-align: center;
        background-color: #FFFFFF;
        border: 1px solid #e7e7eb;
        color: #353535;
    }
</style>
