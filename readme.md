# Messenger Starter Kit

本程序作为Messenger的快速开发示例项目，在实际使用中，可以直接复制到自己的目录中，并修改必要的参数即可。

## 配置信息

本程序的配置信息符合”十二要素“原则，均通过环境变量实现。

环境变量 | 说明 | 默认值
-- | -- | --
PORT | 程序侦听的端口号 | 3000
LOGDIR | 程序日志所在目录 | ./logs

## InfoPlus 类

本程序并不是完全推荐使用自定义的InfoPlus类。在Node.js中已经很好的兼容对象格式。

譬如`InfoPlusResponse`类，可以按照以下方式返回：

```javascript
var r = new InfoPlusResponse();
r.cancel = true;
r.prompt = 'Error Message';
res.json(r);
```

也可以不使用InfoPlusResponse类：

```javascript
res.json({cancel: true, prompt: 'Error Message'});
```

### 事件（Event）

事件是通过字符串属性`req.body.event`获得，其值可以与`InfoPlusEvent`中的常量来作对比，譬如：

```javascript
if (event === InfoPlusEvent.STEP_RENDING) {

}
```

### InfoPlusRequest

请求对象在`req.body.data`中，但是该属性是字符串，需要通过`JSON.parse`方法转换成JSON对象：

```
var json = JSON.parse(req.body.data);
console.debug(json);
```

json对象主要包含以下属性：

```json
{
  "user": {
    "userId" : "b7a193e8-413b-11e8-a6bf-005056a7d173", // GUID 格式的字符串
    "account" : "学工号",
    "trueName" : "姓名"
  },
  "when" : 1589507194, // UNIX 时间戳
  "formData" : { // 表单数据
    "fieldXXX" : "VALUE"
  },
  "fields": [ // 字段信息数组
    {
      "name": "fieldDocumentType",
      "type": "string",
      "groupName" : "CSCY",
      "repeatDepth": 0,
      "notNull": false,
      "allowExternalCode": false,
      "fieldChanging" : false
    },
  ],
  "step": { // 步骤
    "stepId" : 319520,
    "state" : 1,
    "stepCode" : "step2", // 此处在STEP_RENDING等事件中需要
    "stepName" : "审核人",
    // ....   其他属性
    "instance" : {
      "instanceId" : "4f572d6e-f6cb-4d99-921b-d57a3f3a90cd",
      "instanceName" : "测试流程",
      // 其他实例数据 ...
    }
  },
  "actionCode" : "action1", // 点击的按钮的代码
  "actionName" : "审核", // 点击的按钮的文本
  "nextSteps" : [
    // 下一步操作的信息 
    {
      "stepId": 0,
      "state" : 0,
      "nodeId" : 6,
      "workflowVersion" : 0,
      "assignTime" : 0
    }
  ],
  "release" : true // 是否已发布版本
}
```

#### 重复节表单数据

重复节的表单数据是按照索引顺序排列的数组.譬如重复节中有t3\t4两个字段,实际填写了3次重复节,如:

t3 | t4
-- | -- 
1 | 2
3 | 4
5 | 6

则表单数据如下:

req.formData.fieldt3 = ['1', '3', '5'];
req.formData.fieldt4 = ['2', '4', '6'];

### InfoPlusResponse

InfoPlusResponse作为返回信息相对简单。主要包含以下属性，返回时不需要包含所有属性。

```JSON
{
  "cancel" : false, // 是否终止该操作
  "prompt" : "字符串提示信息",
  "then": 0, // 接下来做什么，0：什么都不做；-1：杀掉实例；其它正整数，等待多少秒
  "thenAction" : 0, // 过期后，需要做什么操作
  "detail": "字符串，异常错误的详细信息",
  "formData" : {
    "fieldXXX" : "VALUE", // 为字段赋值
  },
  "codes" : [
    // 代码表
  ]
}
```

## 日志

本程序根据日志分类分为了三个文件，access.log、error.log和system.log。

| 文件 | 说明 |
| - | - |
| access.log | 访问日志 |
| error.log | 错误日志 |
| system.log | 调试类的日志 |

## Unit Test

本程序使用mocha来做单元测试。具体参加`test`文件夹下的`workflowController.test.js`，这是controller的测试文件。

如果程序中需要增加其他代码，则需要编写单元测试文件。

通过以下命令测试：

```bash
mocha 
```

也可以单独测试某个单元：

```bash
mocha -g 'workflowController'
```

## 构建Docker镜像

本StarterKit已经内置了一个Dockerfile文件,可以直接通过`docker build -t messengerStarterKit:1.0 ./ ` 来构建

## 发布到Kubernetes集群中

本StarterKit在k8s目录下包含了一个deployment.yml文件,其中包含了Service和Deployment.用户可以根据实际情况修改其中的配置.

本StarterKit提供了通过GitLab的自动CI/CD来部署镜像到Kubernetes集群中.由于Kubernetes集群和Docker镜像注册器包含了用户名和密码,因此这几项信息在GitLab的CI/CD中配置环境变量.