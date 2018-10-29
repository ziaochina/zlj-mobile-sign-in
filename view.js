export default {
    component: 'div',
    className: 'zlj-mobile-sign-in',
    children: [{
        component: 'div',
        className: 'zlj-mobile-sign-in-header',
        children: {
            component: 'div',
            children: { component: 'h2', children: 'Sign in' }
        },
    }, {
        component: 'antdMobile.List',
        className: 'zlj-mobile-sign-in-content',
        children: [{
            component: 'antdMobile.InputItem',
            placeholder: 'Mobile',
            clear: true,
            onChange: "{{(v)=>$base.setState({'data.form.user': v})}}",
            value: '{{data.form.user}}',
            children: 'Mobile',
        }, {
            component: 'antdMobile.InputItem',
            type: `{{data.isShowOldPassword ?'':'Password'}}`,
            placeholder: 'Password',
            onChange: "{{(v)=>$base.setState({'data.form.password': v})}}",
            value: '{{data.form.password}}',
            children: 'Password'
        }, {
            component: 'antdMobile.WhiteSpace',
            size: 'xl',
        }, {
            component: 'antdMobile.Button',
            type: 'primary',
            children: 'Sign in',
            onClick: '{{$login(data)}}'
        }]
    },
    {
        component: 'div',
        className: 'zlj-mobile-sign-in-footer',
        children: 'Customer service：***-***-***'
    }]
}