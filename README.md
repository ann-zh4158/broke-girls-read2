# broke-girls-read2
solo project: e-Book price-tracking application

Known Issues: 

1. Web Scraper: 
      - Bot Detection by Amazon :( 
        - Solutions: 
          - Randomized proxy rotations were insufficient, likely due to the fact that the list is a subset of a massive publicly published list. 
          - Leverage headless browsers like Puppeteer to better mimic human web-browsing
            - Not yet attempted

Core Tools Highlight: 

Front-End:
1. JavaScript / TypeScript
2. CSS / HTML
3. Libraries:
      - React 
        - React-Query
        - React-Router
      - Material UI
      - Chart.js
      - Axios

Back-End: 
1. TypeScript
2. SQL
3. Libraries
    - Express.js
    - cheerio.js 
    - Axios 
4. Database(s)
    - PostgreSQL    

Module Bundler: Webpack 

