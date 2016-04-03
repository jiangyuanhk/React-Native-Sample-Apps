Authentication React Native App
- Original instructions here: [Building Apps in React Native](https://www.udemy.com/courses/search/?q=Build+Apps+with+React+Native&src=sac&kw=build+apps+react&lang=en)
- Since Parse is out of service, configure Parse Server in [Heroku](https://dashboard.heroku.com/) as a workaround, [instructions](https://www.udemy.com/reactnative/learn/v4/questions/1337246)
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
        │   │   └── signin.js
        │   └── common
        │       └── button.js
        └── main.js
```
- **User sign in**
 - `secureTextEntry={true}` in `<Text>` tag to make typed-in passwords invisible
