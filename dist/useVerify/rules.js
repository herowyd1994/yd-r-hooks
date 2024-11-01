export const rules = {
    nickName: {
        regExp: /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/,
        errMsg: '昵称至少由一个汉字、数字、字母、_ 组成'
    },
    mobile: {
        regExp: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/,
        errMsg: '手机号码格式不正确'
    },
    password: {
        regExp: /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/,
        errMsg: '密码至少由6-20个数字、字母、符号两种及以上的组成'
    },
    idCard: {
        regExp: /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/,
        errMsg: '身份证号格式不正确'
    },
    bankCard: {
        regExp: /^[1-9]\d{9,29}$/,
        errMsg: '银行卡号格式不正确'
    },
    email: {
        regExp: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        errMsg: '邮箱地址格式不正确'
    },
    url: {
        regExp: /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/,
        errMsg: '网络地址格式不正确'
    },
    wx: {
        regExp: /^[a-zA-Z][-_a-zA-Z0-9]{5,19}$/,
        errMsg: '微信号格式不正确'
    },
    qq: {
        regExp: /^[1-9][0-9]{4,10}$/,
        errMsg: 'QQ号格式不正确'
    },
    base64: {
        regExp: /^\s*data:(?:[a-z]+\/[a-z0-9-+.]+(?:;[a-z-]+=[a-z0-9-]+)?)?(?:;base64)?,([a-z0-9!$&',()*+;=\-._~:@/?%\s]*?)\s*$/i,
        errMsg: 'base64格式不正确'
    },
    licensePlate: {
        regExp: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领]{1}[A-HJ-NP-Z]{1}(?:(([0-9]{5}[DF])|([DF][A-HJ-NP-Z0-9][0-9]{4}))|[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1})$/,
        errMsg: '车牌号格式不正确'
    },
    passport: {
        regExp: /(^[EeKkGgDdSsPpHh]\d{8}$)|(^(([Ee][a-fA-F])|([DdSsPp][Ee])|([Kk][Jj])|([Mm][Aa])|(1[45]))\d{7}$)/,
        errMsg: '护照格式不正确'
    },
    amount: {
        regExp: /(?:^[1-9]([0-9]+)?(?:\.[0-9]{1,2})?$)|(?:^(?:0){1}$)|(?:^[0-9]\.[0-9](?:[0-9])?$)/,
        errMsg: '金额格式不正确'
    }
};
export const fnRules = {
    length: {
        validate: (value, target) => value.length === target,
        errMsg: '不等于设置的长度'
    },
    minLength: {
        validate: (value, target) => value.length >= target,
        errMsg: '不能小于最小长度'
    },
    maxLength: {
        validate: (value, target) => value.length <= target,
        errMsg: '不能大于最大长度'
    },
    min: {
        validate: (value, target) => value >= target,
        errMsg: '不能小于最小值'
    },
    max: {
        validate: (value, target) => value <= target,
        errMsg: '不能大于最大值'
    }
};
