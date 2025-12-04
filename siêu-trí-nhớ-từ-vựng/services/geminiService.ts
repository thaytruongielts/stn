import { GoogleGenAI } from "@google/genai";
import { VocabularyWord } from "../types";

const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateMnemonicStory = async (words: VocabularyWord[]): Promise<string> => {
  if (!apiKey) {
    return "Vui lòng cung cấp API Key để sử dụng tính năng tạo câu chuyện AI.";
  }

  const wordList = words.map(w => `${w.term} (${w.vietnamese})`).join(', ');

  const prompt = `
    Hãy viết một câu chuyện ngắn, hài hước và dễ nhớ (phương pháp Siêu Trí Nhớ) bằng Tiếng Việt.
    Câu chuyện này PHẢI chứa các từ tiếng Anh sau đây (giữ nguyên từ tiếng Anh trong câu chuyện, có thể kèm nghĩa tiếng Việt trong ngoặc lần đầu xuất hiện):
    ${wordList}.
    
    Hãy làm nổi bật các từ vựng này (ví dụ: viết in hoa hoặc đặt trong dấu ngoặc kép).
    Mục đích là giúp người học ghi nhớ các từ này thông qua sự liên tưởng kỳ quặc hoặc thú vị.
    Giữ câu chuyện dưới 200 từ.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "Không thể tạo câu chuyện lúc này.";
  } catch (error) {
    console.error("Error generating story:", error);
    return "Đã xảy ra lỗi khi kết nối với AI. Vui lòng thử lại sau.";
  }
};
