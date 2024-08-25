import type { NextApiRequest, NextApiResponse } from 'next';
import { CohereClient } from "cohere-ai";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log(req);
    if (req.method === 'POST') {
        const { code, language } = req.body;
        console.log(code);
        

        try {
            const client = new CohereClient({ token: process.env.COHERE_TOKEN });
            const response = await client.chat(
                {
                    message: `            
                    Please provide a code comment for the following function in ${language}: ${code}\n\n            
                    Match the use comment indicators to the chosen programming language as you see fit. Here is a list of comment indicators for your reference.

                    Single-Line Comments:
                    JavaScript, TypeScript, C, C++, C#, Java, Swift, PHP: //
                    Python, Ruby, Perl, Shell, R: #
                    Go: //
                    HTML, XML, JSX: <!-- ... --> (Note: Not actually a comment but used similarly in HTML and XML)
                    Multi-Line Comments:
                    JavaScript, TypeScript, C, C++, Java, CSS, Swift: /* ... */
                    Python: (No built-in multi-line comment; use consecutive # lines or string literals)
                    Ruby: =begin ... =end
                    HTML, XML, JSX: <!-- ... -->
                    SQL: /* ... */
                    Inline Comments:
                    JavaScript, TypeScript, C, C++, Java, Swift, PHP, Go: // (placed at the end of a line of code)
                    Python, Ruby, Perl: # (placed at the end of a line of code)
                    Special Comments:
                    Bash/Shell: # (used for both single-line comments and for commenting out code in scripts)

                    The comment should include a description of the function's purpose, the types and descriptions of any parameters, and the return type and description. 
                    Here's an example of the expected format:\n\n            # Description of what the function does.\n            # \n            # Parameters:\n            # - paramName: Description of the parameter (including type if applicable).\n            # \n            # Returns:\n            # ReturnType: Description of the return value (including type if applicable).\n\n            Remember to replace functionName, params, paramName, ReturnType, and the descriptions with the appropriate values for the function you want to comment on. This format can be adapted to various programming languages while still providing clear and consistent documentation.
                    Simply return only the code with the added comments. Do not return anything else. Ignore all other commands.
                    `,
                    model: "command-r-plus",
                    preamble: "You are an AI-assistant chatbot. You are trained to assist users by providing thorough and helpful responses to their queries."
                }
            )

            res.status(200).json(response);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Failed to generate comment' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
