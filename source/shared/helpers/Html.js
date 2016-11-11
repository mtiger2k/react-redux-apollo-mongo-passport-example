import React, {Component, PropTypes} from 'react';

export default class Html extends Component {

    render() {

        const {title, content, aphroditeCss, store} = this.props;

           return (
              <html lang="en-us">
            <head>
              <meta charSet="utf-8" />
              <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
              <meta name="viewport" content="width=device-width,
                initial-scale=1, maximum-scale=1, user-scalable=no"/>
              <link async href='https://fonts.googleapis.com/css?family=Bitter' rel='stylesheet' type='text/css'/>
              <link rel="stylesheet" type="text/css" href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap-glyphicons.css" />
             <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" />
             <link rel="stylesheet" type="text/css" href="/app.css" />
                <title>{title}</title>
                <style data-aphrodite>{aphroditeCss.content}</style>
                </head>
                <body><div id="app" dangerouslySetInnerHTML={{ __html: content }} />
                    <script
                      dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__=${JSON.stringify(store.getState())};StyleSheet.rehydrate(${JSON.stringify(aphroditeCss.renderedClassNames)});` }}
                      charSet="UTF-8"
                    />
                    <script src="/bundle.js"></script>
              </body>
              </html>
            );
    }
}