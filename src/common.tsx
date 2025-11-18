import Groq from "groq-sdk";

export const getNodeTypeColorClass = (type: string) => {
    switch (type) {
        case "type1":
            return "bg-blue-100 text-blue-800";
        case "type2":
            return "bg-green-100 text-green-800";
        case "type3":
            return "bg-yellow-100 text-yellow-800";
        default:
            return "bg-gray-100 text-gray-800";
    }
};

export const getSimpleId = () => {
    const dateString = Date.now().toString(36);
    const randomness = Math.random().toString(36).substr(2);
    return dateString + randomness;
};

const groq = new Groq({
    apiKey: import.meta.env.VITE_GROQ_API_KEY || "",
    dangerouslyAllowBrowser: true,
});

export async function getGroqChatCompletion(message: string) {
    return groq.chat.completions.create({
        messages: [
            {
                role: "system",
                content: `You are an expert data analyst. Provide concise
          and clear analysis based on the user provided JSON data
          in the format of a markdown report with text and tables.`,
            },
            {
                role: "user",
                content: message,
            },
        ],
        model: "openai/gpt-oss-20b",
    });
}

// Common utility functions for markdown and PDF download

export function downloadMarkdown(markdown: string, filename = "report.md") {
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

export async function downloadPDF(markdown: string) {
    const formData = new FormData();
    formData.append("markdown", markdown);
    formData.append(
        "css",
        `
      h1, h2 {
        color: MidnightBlue;
      }
      table {
        border-collapse: collapse;
      }
      table, th, td {
        border: 1px solid DimGray;
      }
      th, td {
        text-align: left;
        padding: 1em;
      }
      body {
        font-family: 'Inter', 'Arial', sans-serif;
      }
    `
    );
    const response = await fetch("https://md-to-pdf-3raw.onrender.com", {
        method: "POST",
        body: formData,
    });
    if (!response.ok) throw new Error("PDF conversion failed");
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
}
