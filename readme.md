CKEditor uploadAdapter 七牛云版本
================================

### usage

        import React, { Component } from 'react';
        import CKEditor from '@ckeditor/ckeditor5-react';
        import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
        import uploadAdapterQiniu from '@huanshao/upload-adapter-qiniu-common'
        
        class App extends Component{
            getToken = ()=>{
                return new Promise(resolve=>{
                const token = "";
                    resolve(token)
                })
            }
            
            qiniuCdnDomain = "http://example.com"
            
            render(){
                return (
                    <CKEditor 
                        editor={ClassicEditor}
                        onInit={editor => {
                            uploadAdapterQiniu(editor,this.getToken,this.qiniuCdnDomain)
                        }}
                    />
                )
            }
        }
        
### params
1. editor ckeditor实例
2. getToken function 需要返回一个promise，token
3. domain
