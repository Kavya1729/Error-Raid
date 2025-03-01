import { useState, useEffect } from 'react';
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios';

function AISolution() {
  const [code, setCode] = useState(`function sum() {
  return 1 + 1
}`);

  const [review, setReview] = useState(``);

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    const token = localStorage.getItem('token');
    const response = await axios.post('http://localhost:3000/ai/get-solution', { code }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setReview(response.data);
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 20,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%"
              }}
            />
          </div>
          <div
            onClick={reviewCode}
            className="review"
          >
            Review
          </div>
        </div>
        <div className="right">
          <Markdown
            rehypePlugins={[rehypeHighlight]}
            components={{
              h1: ({ node, ...props }) => <h1 style={{ fontWeight: 'bold', fontSize: '2em' }} {...props} />,
              h2: ({ node, ...props }) => <h2 style={{ fontWeight: 'bold', fontSize: '1.5em' }} {...props} />,
              h3: ({ node, ...props }) => <h3 style={{ fontWeight: 'bold', fontSize: '1.2em' }} {...props} />,
            }}
          >
            {review}
          </Markdown>
        </div>
      </main>
    </>
  );
}

export default AISolution;