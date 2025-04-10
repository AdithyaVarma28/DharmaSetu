"use client"

import { useState, useRef, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { FileUploader } from "@/components/file-uploader"
import { ChatMessage } from "@/components/chat-message"
import { Paperclip, Send, Mic, X, Scale, Globe } from "lucide-react"
import { AppSidebar } from "@/components/app-sidebar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import axios from 'axios'
import { formatMessage } from '@/utils/formatMessage'

// Mock data for chat messages
const INITIAL_MESSAGES = [
  {
    id: 1,
    role: "system",
    content: "Good Evening. How can I help you today?",
  },
]

export default function AppPage() {
  const searchParams = useSearchParams()
  const moduleParam = searchParams.get("module")

  const [activeModule, setActiveModule] = useState("legal-assistant")
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [input, setInput] = useState("")
  const [attachments, setAttachments] = useState<string[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingStep, setProcessingStep] = useState(0)
  const [showAttachDialog, setShowAttachDialog] = useState(false)
  const [language, setLanguage] = useState("english")

  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Set the active module based on URL parameter
  useEffect(() => {
    if (moduleParam) {
      const modules = ["legal-assistant", "language-simplifier", "community-hub", "case-predictor", "contract-review"]

      const index = Number.parseInt(moduleParam) - 1
      if (index >= 0 && index < modules.length) {
        setActiveModule(modules[index])
      }
    }
  }, [moduleParam])

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Handle sending a message
  const handleSendMessage = async () => {
    if (input.trim() === '' && attachments.length === 0) return;

    const userMessage = {
      id: messages.length + 1,
      role: 'user',
      content: input,
      attachments: [...attachments],
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setAttachments([]);

    setIsProcessing(true);
    setProcessingStep(0);

    const steps = ["Thinking", "Analysing User request", "Compiling summary", "Finalising"];
    let stepIndex = 0;

    // Generate a random total time for the animation (between 2 and 5 seconds)
    const totalAnimationTime = Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000;
    const stepDuration = totalAnimationTime / steps.length;

    const stepInterval = setInterval(() => {
      setProcessingStep(stepIndex);
      stepIndex++;
      if (stepIndex >= steps.length) {
        clearInterval(stepInterval);
      }
    }, stepDuration);

    try {
      // Wait for the animation to complete before sending the request
      await new Promise((resolve) => setTimeout(resolve, totalAnimationTime));

      const response = await axios.post('http://127.0.0.1:5000/api/run_chatbot', { query: input });
      setProcessingStep(steps.length); // Mark all steps as completed

      const aiResponse = {
        id: messages.length + 2,
        role: 'system',
        content: response.data.response,
      };

      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error communicating with the backend:', error);
      setMessages((prev) => [...prev, { id: messages.length + 2, role: 'system', content: 'Error processing your request.' }]);
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle file upload
  const handleFileUpload = async (files: File[]) => {
    if (!files || files.length === 0) return;

    const mode = activeModule === "language-simplifier" ? "ls" : "cr";
    const file = files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('mode', mode);

    setIsProcessing(true);

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/upload_file', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        const aiResponse = {
          id: messages.length + 1,
          role: 'system',
          content: response.data.result,
        };

        setMessages(prev => [...prev, aiResponse]);
      } else {
        throw new Error(`Unexpected response: ${response.status}`);
      }
    } catch (error) {
      console.error('Error uploading file:', error);

      setMessages(prev => [
        ...prev,
        {
          id: messages.length + 1,
          role: 'system',
          content: 'Error processing your document. Please ensure the file is valid and try again.',
        },
      ]);
    } finally {
      setIsProcessing(false);
      setShowAttachDialog(false); // Ensure the dialog is closed after upload
    }
  };

  // Remove attachment
  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index))
  }

  // Generate mock response based on active module and language
  const generateMockResponse = (module: string, query: string, language: string) => {
    let response = ""
    switch (module) {
      case "legal-assistant":
        response =
          "Based on your query, I can explain that the Indian Constitution is the supreme law of India. It lays down the framework defining fundamental political principles, establishes the structure, procedures, powers, and duties of government institutions, and sets out fundamental rights, directive principles, and duties of citizens. It was adopted on 26 November 1949 and came into effect on 26 January 1950."
        break
      case "language-simplifier":
        response =
          "I've analyzed the legal document you shared. In simple terms, this document is a rental agreement that outlines the terms between a landlord and tenant. Key points include: 1) Monthly rent of ₹15,000, 2) Security deposit of ₹45,000, 3) 11-month lease period, 4) Tenant responsible for utility bills, 5) No subletting allowed."
        break
      case "case-predictor":
        response =
          "Based on the case details you've provided and similar historical cases, there's approximately a 65% likelihood of a favorable outcome. The strongest arguments in your favor are the documented breach of contract and the evidence of financial loss. I recommend focusing on these aspects during proceedings."
        break
      case "contract-review":
        response =
          "I've reviewed the contract and identified several potential issues: 1) Clause 4.2 contains ambiguous language regarding payment terms, 2) The liability limitation in Section 7 may not be enforceable under current regulations, 3) Missing clear dispute resolution mechanism, 4) Termination clause lacks specific conditions. I recommend addressing these issues before proceeding."
        break
      default:
        response = "I've processed your request. Is there anything specific you'd like me to explain or clarify?"
    }

    // Simulate translation if language is not English
    if (language !== "english") {
      return '[Translated to ${language.charAt(0).toUpperCase() + language.slice(1)}] ${response}'
    }

    return response
  }

  // Show attachment button only for Legal Language Simplifier and Contract Review
  const showAttachmentButton = activeModule === "language-simplifier" || activeModule === "contract-review"

  return (
    <div className="flex min-h-screen">
      <AppSidebar activeModule={activeModule} />
      <div className="flex-1 flex flex-col">
        <header className="sticky top-0 z-20 border-b py-3 px-6 flex items-center justify-between bg-background">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Scale className="h-5 w-5 text-primary" />
              <span>DharmaSetu</span>
            </Link>
            <div className="ml-6 text-lg font-medium">
              {activeModule === "legal-assistant" && "Legal Answer Assistant"}
              {activeModule === "language-simplifier" && "Legal Language Simplifier"}
              {activeModule === "case-predictor" && "Case Predictor & Resolution Tool"}
              {activeModule === "contract-review" && "Contract Review & Compliance Checker"}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-gray-500" />
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-[150px] h-8">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="hindi">Hindi</SelectItem>
                <SelectItem value="tamil">Tamil</SelectItem>
                <SelectItem value="telugu">Telugu</SelectItem>
                <SelectItem value="bengali">Bengali</SelectItem>
                <SelectItem value="marathi">Marathi</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </header>

        <main className="flex-1 flex flex-col">
          <div className="flex-1 overflow-auto p-4">
            <div className="max-w-3xl mx-auto space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={message.role === 'user' ? 'text-right' : 'text-left'}>
                  <div className={`inline-block p-4 rounded-lg ${
                    message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                  }`}>
                    <div dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }} />
                  </div>
                </div>
              ))}

              {isProcessing && (
                <div className="bg-gray-50 rounded-lg p-4 max-w-3xl">
                  <h3 className="text-sm font-medium mb-2">
                    Completing <span className="text-xs text-gray-500">16 sec</span>
                  </h3>
                  <div className="flex items-center justify-between mb-4">
                    {["Thinking", "Analysing User request", "Compiling summary", "Finalising"].map((step, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            index < processingStep
                              ? "bg-green-500 text-white"
                              : index === processingStep
                              ? "bg-primary text-white"
                              : "bg-gray-200"
                          }`}
                        >
                          {index < processingStep ? "✓" : ""}
                        </div>
                        <span className="text-xs mt-1">{step}</span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-white rounded-lg p-4 border">
                    <div className="flex items-center">
                      <h4 className="font-medium">Thinking</h4>
                      <Button variant="ghost" size="sm" className="ml-auto">
                        <span className="sr-only">Collapse</span>
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                        >
                          <path
                            d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          />
                        </svg>
                      </Button>
                    </div>
                    <div className="mt-2 text-sm">
                      <p>Analyzing user request...</p>
                      {attachments.length > 0 && <p className="mt-2">Processing attached documents...</p>}
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="border-t p-4">
            <div className="max-w-3xl mx-auto">
              {attachments.length > 0 && (
                <div className="hidden">
                  {attachments.map((file, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      <span className="truncate max-w-[200px]">{file}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 ml-1"
                        onClick={() => removeAttachment(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              )}

              <div className="flex items-end gap-2">
                {showAttachmentButton && (
                  <Dialog open={showAttachDialog} onOpenChange={setShowAttachDialog}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="icon" className="shrink-0">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Attach</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <h3 className="text-sm font-medium">Upload files</h3>
                          <p className="text-xs text-gray-500">Drag and drop to upload</p>
                          <FileUploader onUpload={handleFileUpload} />
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}

                <Textarea
                  placeholder="Ask something..."
                  className="min-h-[60px] flex-1"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                />

                <div className="flex gap-2">
                  <Button variant="outline" size="icon" className="shrink-0">
                    <Mic className="h-4 w-4" />
                  </Button>
                  <Button size="icon" className="shrink-0" onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}