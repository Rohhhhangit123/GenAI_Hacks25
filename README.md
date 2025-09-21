AI-Powered Misinformation Detection Tool
Overview

This project is an AI-powered tool that helps users evaluate the credibility of text-based content in real time. By leveraging Generative AI and Google Cloud services, the system analyzes user-submitted content for factual accuracy, language manipulation, and logical consistency, providing a weighted credibility score along with educational insights.

Challenges Addressed

Rapid spread of misinformation across social media, messaging apps, and news platforms.

Difficulty for users to verify content in real time.

Traditional fact-checking methods are slow, reactive, and limited in scale.

Online content often contains subtle manipulative techniques like clickbait, exaggeration, and false causality.

Solution

The system works in multiple stages:

Claim Extraction: User-submitted text is broken down into individual claims or statements.

Fact Retrieval: Relevant facts are gathered from trusted sources via Google Custom Search.

AI Evaluation: A Vertex AI / Gemini LLM model analyzes the claims in the context of retrieved facts to produce a credibility score.

Sub-Factor Analysis: Language sentiment and logical consistency are evaluated using Google Cloud Natural Language API and AI reasoning models.

Weighted Credibility Score: Scores from all sub-factors are combined into an overall score (0–100).

Real-Time API: Exposed via a Cloud Function API for seamless integration with web or mobile applications.

<img width="1906" height="993" alt="Screenshot 2025-09-21 184812" src="https://github.com/user-attachments/assets/e9a76a98-b00f-43c2-b840-8afb3ac6c135" />
<img width="1902" height="1001" alt="Screenshot 2025-09-21 184849" src="https://github.com/user-attachments/assets/f0611c7d-88a2-46a4-b057-c8a448036e60" />


Unique Selling Proposition (USP)

Multi-Dimensional Analysis: Evaluates factual alignment, emotional manipulation, and logical consistency for nuanced credibility scoring.

Real-Time & Context-Aware: Integrates live web facts with AI reasoning to adapt to new information.

Educational Feedback: Users learn why content may be misleading, fostering informed digital citizenship.

Scalable & Cloud-Native: Built entirely on Google Cloud using Cloud Functions, Vertex AI, Natural Language API, and Custom Search API.

Technology Stack

Frontend: Any web/mobile client (calls Cloud Function API).

Backend: Python Cloud Function (functions_framework)

AI Models: Gemini / Vertex AI LLM (text-bison / gemini-2.5-flash)

Google Cloud Services:

Cloud Functions (API endpoint)

Vertex AI (Generative AI / LLM)

Cloud Natural Language API (sentiment & syntax analysis)

Google Custom Search API (fact retrieval)
