zlj-mobile-sign-in application, a simple example of mobile login.

## Usage

1. Add dependency
```bash
$ maka add zlj-mobile-sign-in
```

2. Modify the code

*Embedded use*
```javascript
const view = {
    component: 'div',
    children: [{
        component: 'AppLoader',
        appName: 'zlj-mobile-sign-in'
    }]
}
```
*Navigate use*
```javascript
import {navigate} from 'maka'
...
btnClick = () => {
    navigate.redirect('/zlj-mobile-sign-in')
}
...
```

## Download and run

1. Download
2. Decompress
3. Enter decompress directory
4. Run
```bash
$ yarn start
```

## License

MIT

