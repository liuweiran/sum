# ejs

用<%...%>包含js代码
用<%=...%>输出变量 变量若包含 '<' '>' '&'等字符 会被转义
用<%-...%>输出变量 不转义
用<%- include('user/show') %>引入其他模板 包含 ./user/show.ejs
用<%# some comments %>来注释，不执行不输出
<%% 转义为 '<%'
<% ... -%> 删除新的空白行模式
<%_ ... _%> 删除空白符模式