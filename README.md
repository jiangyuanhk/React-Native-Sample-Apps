##Authentication React Native App
- Original instructions of the course:
[Udemy - Building Apps with React Native](https://www.udemy.com/courses/search/?q=Build+Apps+with+React+Native&src=sac&kw=build+apps+react&lang=en)
- Since Parse is out of service, configure Parse Server in [Heroku](https://dashboard.heroku.com/) as a workaround, [instructions](http://www.alekseev.ca/blog/using-a-parse-server-with-react-native)
- Specifically in this example
  - Parse server address in Heroku is: *parse-server-01*
  -  **Initialize parse**:
```javascript
  componentWillMount: function() {
    Parse.initialize('myAppId','unused');
    Parse.serverURL = 'https://parse-server-01.herokuapp.com/parse';
  },
```
  - **adding test user** (username: TESTUSER, password: PASSWORD)
```ruby
curl -X POST \
  -H "X-Parse-Application-Id: myAppId" \
  -H "Content-Type: application/json" \
  -d '{"username":"TESTUSER","password":"PASSWORD"}' \
  http://parse-server-01.herokuapp.com/parse/classes/_User
```



###Notes
- Use `main.js` as a shared endpoint for both `index.ios.js` and 'android.ios.js'
- Organize files by UI components, whether they are shared or OS-specific, ect.
- **Structure of src folder**
```
        ├── components
        │   ├── authentication
        │   │   ├── signin.js
        │   │   └── signup.js
        │   ├── common
        │   │   └── button.js
        │   └── tweets
        │       └── tweets.js
        |── main.js
        ├── index.ios.js
        └── index.android.js
```

- **User sign in**
 - `secureTextEntry={true}` in `<Text>` tag to make typed-in passwords invisible
 - Using Parse API to sign in the user:
    - [commit](https://github.com/jiangyuanhk/React-Native-Sample-Apps/commit/b8cd92e9fdd829602a2b2b587c779d915cf83e99)
    - [Parse Guide for javascript developer] (https://parse.com/docs/js/guide)


- **Navigation**
 - Think of `Navigator` as a stack of views, pop / push views, we put related views in the same stack
 - When it comes to going to another part of the App, replace the stack completely
 - [Use `Navigator`for app routing](https://github.com/jiangyuanhk/React-Native-Sample-Apps/commit/edf6a710b24e76fb2d0f39c43c43be8b67f1e3fa)
```javascript
    <Navigator
          style={styles.container}
          initialRoute={{name: 'signin'}}
          renderScene={this.renderScene}
          configureScene={() => { return  Navigator.SceneConfigs.FloatFromRight; }}
          />
```
    - `initialRoute(object)`: specifies that TOS = object
    - `renderScene(route, navigator)`: listens to stack changes and takes of rendering, route is always the TOS object
    - `configureScene`: determines the animation of transition

  - [SignIp => SignUp using push](https://github.com/jiangyuanhk/React-Native-Sample-Apps/commit/90f0dbee1a47f632ffce4274b107c33f4f107134)
  - [SignUp => SignIn using pop](https://github.com/jiangyuanhk/React-Native-Sample-Apps/commit/dd96f90d9a113d4453d94140288442db3ef1ac93)

  - After User Sign In, use  `navigator.immediatelyResetRouteStack` to replace the navigator stack - [commit](https://github.com/jiangyuanhk/React-Native-Sample-Apps/commit/c6b4d3ca87ec2be8e18fa6ac93052e338dce43f3)

- [Password confirmation](https://github.com/jiangyuanhk/React-Native-Sample-Apps/commit/75bcd657ccc78451599c41aef59477c9e9a0df23)
