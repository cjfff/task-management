const Router = require('koa-router')

const router = new Router({
  prefix: '/api/v1/users'
})

router.get('/login', (ctx) => {
  ctx.body = {
    code: 0,
    message: 'success',
    payload: {
      id: '7d8d7c4039334919ab26dff9c2a10d92',
      tenantId: '2a9edce3e59972a89f4bc1c9c98391e5',
      createdBy: null,
      createdAt: 1553154542000,
      updatedBy: null,
      updatedAt: null,
      dr: 0,
      accountId: '5eed03868ade41798b682a796037ba6d',
      password: null,
      token: null,
      username: 'lanzhou',
      usernumber: null,
      nickname: 'lanzhou',
      email: 'dalin@deepexi.com',
      avatar: null,
      gender: null,
      phone: null,
      status: '1',
      type: '1',
      ext1: null,
      ext2: null,
      ext3: null,
      ext4: null,
      ext5: null,
      extJson: null,
      channel: 'spaasinit',
      thirdId: 'ddcddd7815694798b91df5034ee6b369',
      birthday: null,
      joinTime: null,
      departureTime: null,
      incumbencyStatus: '1',
      jobLevel: '',
      jobLevelDesc: '',
      formalTime: null,
      socialYear: null,
      usernameEn: '',
      companyLocaltion: '',
      companyLocaltionDesc: '',
      workLocaltion: '',
      workLocaltionDesc: '',
      userClass: '',
      userClassDesc: '',
      education: '',
      educationDate: null,
      lastWorkData: null,
      idtype: null,
      idnumber: null,
    },
  }
})



module.exports = router
