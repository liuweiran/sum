# vue.js

## vuejs 单文件组件.vue

>vuejs 自定义了一种 `.vue` 文件，把html、css、js写到这一个文件中，实现了对一个组件的封装，一个 `.vue` 文件就是一个单独的组件。由于.vue文件是自定义的，浏览器不认识，所以需要对该文件进行解析。 在webpack构建中，需要安装vue-loader 对.vue文件进行解析。在 sumlime 编辑器中，我们 书写.vue 文件，可以安装vue syntax highlight 插件，增加对文件的支持。

    <template>
      <div>
        <input type="txet" placeholder="请输入文字" v-model="msg">
      </div>
    </template>
     
     
     
    <!-- Add "scoped" attribute to limit CSS to this component only -->
    <style scoped="">
      input {
        width: 300px;
        height: 30px;
        padding-left: 10px;
        border: 1px solid blue;
        border-radius: 10px;
        outline: none;
      }
    </style>
    
在 .vue 文件中， template 中写html 代码，其实就是定义模板；script中写js 代码，它定义这个组件中所需要的数据和及其操作， style 里面写css 样式，定义这个组件的样式，scoped 表明这里写的css 样式只适用于该组件，可以限定样式的作用域。

### script 标签中 export defalut 后面的对象的理解

>在不使用.vue 单文件时，我们是通过 Vue 构造函数 创建一个 Vue 的根实例 来启动vuejs 的， Vue 构造函数接受一个对象，这个对象有一个配置属性 el, data, component, template 等。

    new Vue({
      el: '#app',
      data: {
            msg: "hello Vue"    
      } 
    })
    
在.vue文件中，export default 后面的对象 就相当于 new Vue() 构造函数中的接受的对象， 它们都是定义组件所需要的数据（data）, 以及操作数 据的方法等， 更为全面的一个 export default 对象，有methods, data, computed, 这时可以看到, 这个对象和new Vue() 构造函数中接受的对象是一模一样的。但要注意data 的书写方式不同。在vue 组件， data 必须是一个函数，它return（返回一个对象），这个返回的对象的数据，供组件实现。

    export default {
      name: 'hello',
      data () {
        return {
          msg: 'Welcome to Your Vue.js App'
        }
      },
      methods:{
        enter () {
          alert(this.msg);
        }
      },
      computed: {
        upper () {
          return this.msg.toUpperCase();
        }
      }
    }

###  组件之间的通信

每一个.vue 文件就是一个 组件，组件和组件相互组合，就成了一个应用，这就涉及到的组件和组件之间的通信，最常用的就是父子之间的通信。在vue 中， 在一个组件中通过 import 引入另一个组件，这个组件就是父组件，被引入的组件就是子组件。

通过vue-cli 初始化一个项目，我们可以看到在src 文件夹下有一个App.vue 文件， 在其中，import Hello from './components/Hello'， App.vue 就是父组件，components 文件夹下的Hello.vue 就是子组件。 父组件通过props 向子组件传递数据，子组件通过自定义事件向父组件传递数据。

　　父组件向子组件传值, 它主要是通过元素的属性进行的. 在App.vue 的template中,有一个 <hello></hello>, 这就是我们引入的子组件.  给其添加属性如 mes-father="message from father";  父组件将数据传递进去,子组件需要接收才能使用. 怎样接收呢?

在Hello.vue 中, export default 后面的对象中,添加一个字段props, 它是一个数组, 专门用来接收父组件传递过来的数据. props: ["mesFather"], 这里定义了mesFather 字符串, 和父组件中定义的元素的属性一一对应. 但是我们在父组件,就是在 <hello /> 元素中定义的属性是mes-father， 没有一一对应啊?  这主要是因为，在html 元素中大小写是不敏感的。 如果我们写成<hello mesFather="message from father"></hello>， 里面的mesFather 就会转化成mesfather, 相当于我们向子组件传递了一个mesfather数据， 如果在js 文件中，我们定义 props: ["mesFather"]，我们是接受不到数据的，因为js 是区分大小写的， 只能写成props: ["mesfather"].  但是在js 文件中，像这种两个单词拼成的数据，我们习惯用驼峰命名法，所以vue 做了一个转化，如果在组件中属性是 - 表示，它 自动会转化成驼峰式。  传进来的数据是mes-father, 转化成mesFather, 我们在js 里面写mesFather, 一一对应，子组件可以接受到组件。 props 属性是和data， methods 属性并列的，属同一级别。 props 属性里面定义的变量，在 子组件中的template 中可以直接使用。


http://www.cnblogs.com/SamWeb/p/6391373.html