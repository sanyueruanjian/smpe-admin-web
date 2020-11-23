import request from '@/utils/request'

export function getMenu() {
  return request({
    url: '/api/menu/getMenu'
  })
}

export function addMenu(lists) {
  return request.post('/api/menu/addMenu', lists)
}

export function addKeyWordRule(category, content, keyWord, title, type) {
  return request.post('/api/wx-autoreply/addKeyWordRule', category, content, keyWord, title, type)
}

export function getRulesByCategory(type) {
  return request.get('/api/wx-autoreply/getRulesByCategory', {
    params: { 'category': type }
  })
}

export function deleteRuleById(id) {
  return request.delete('/api/wx-autoreply/deleteRuleById', {
    params: { 'ruleID': id }
  })
}

export function updataKeyWordRule(category, content, id, keyWord, title, type) {
  return request.put('/api/wx-autoreply/updateKeyWordRule', category, content, id, keyWord, title, type)
}

export function addMessageAndFollowRule(category, content) {
  return request.post('/api/wx-autoreply/addMessageAndFollowRule', category, content)
}
