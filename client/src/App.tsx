import React, { useState } from 'react';
import { 
  Terminal, 
  Code2, 
  LayoutTemplate, 
  Rocket, 
  Server, 
  CheckCircle2, 
  ArrowRight, 
  Copy, 
  ChevronRight,
  ChevronLeft, // 新增：收缩图标
  MonitorPlay,
  Laptop,
  Globe,
  FolderOpen,
  GitBranch,
  Bot,
  FileCode,
  CheckSquare,
  CloudUpload,
  Layers,
  Database,
  Box,
  GitMerge,
  Workflow,
  AlertTriangle,
  Wrench,
  Menu, 
  X
} from 'lucide-react';

// --- 类型定义 ---
type StepId = 'intro' | 'stack' | 'env' | 'init' | 'tailwind' | 'migrate' | 'git' | 'launch' | 'backend' | 'deploy' | 'advanced';

interface Step {
  id: StepId;
  title: string;
  icon: React.ElementType;
  description: string;
}

const steps: Step[] = [
  { id: 'intro', title: '旅程概览', icon: LayoutTemplate, description: '从 Gemini 原型到独立产品' },
  { id: 'stack', title: '1. 技术栈解密', icon: Layers, description: '深度解析 React 生态系统' },
  { id: 'env', title: '2. 工具准备', icon: MonitorPlay, description: 'Node.js, Git & Cursor' },
  { id: 'init', title: '3. 创建项目', icon: FolderOpen, description: '终端模式 vs Cursor AI 模式' },
  { id: 'tailwind', title: '4. 样式配置', icon: Code2, description: '注入 Tailwind CSS 灵魂' },
  { id: 'migrate', title: '5. 搬运代码', icon: Laptop, description: '从这里复制到那里' },
  { id: 'git', title: '6. 版本控制', icon: GitBranch, description: 'Git 原理与上传' },
  { id: 'launch', title: '7. 本地测试', icon: Rocket, description: '在本地跑起来' },
  { id: 'backend', title: '8. 后端演进', icon: Database, description: 'Node.js + 数据库架构' },
  { id: 'deploy', title: '9. 线上部署', icon: Globe, description: '前端、后端与数据库上云' },
  { id: 'advanced', title: '10. 进阶概念', icon: Workflow, description: '分支策略与 CI/CD 流水线' },
];

export default function DeploymentGuide() {
  const [currentStep, setCurrentStep] = useState<StepId>('intro');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // 新增：控制桌面侧边栏收缩

  const handleStepChange = (id: StepId) => {
    setCurrentStep(id);
    setIsMobileMenuOpen(false);
  };

  const StepContent = () => {
    switch (currentStep) {
      case 'intro': return <IntroView setStep={handleStepChange} />;
      case 'stack': return <StackView />;
      case 'env': return <EnvView />;
      case 'init': return <InitView />;
      case 'tailwind': return <TailwindView />;
      case 'migrate': return <MigrateView />;
      case 'git': return <GitView />;
      case 'launch': return <LaunchView />;
      case 'backend': return <BackendView />;
      case 'deploy': return <DeployView />;
      case 'advanced': return <AdvancedView />;
      default: return <IntroView setStep={handleStepChange} />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-slate-900 text-slate-200 font-sans selection:bg-indigo-500/30 overflow-hidden">
      
      {/* Mobile Header (仅手机端显示) */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-950 border-b border-slate-800 shrink-0 z-50">
        <div className="flex items-center gap-2 font-bold text-white">
          <Rocket className="text-indigo-500" size={20} />
          <span>Deploy OS</span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <div className={`
        fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-sm transition-all duration-300 
        md:translate-x-0 md:relative md:inset-auto md:bg-slate-950 md:border-r md:border-slate-800 md:flex md:flex-col md:shrink-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        ${isSidebarCollapsed ? 'md:w-20' : 'md:w-72'} 
      `}>
        {/* Sidebar Header */}
        <div className={`p-4 md:p-6 border-b border-slate-800 flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
          {!isSidebarCollapsed && (
            <div>
              <h1 className="text-xl font-bold text-white flex items-center gap-2">
                <Rocket className="text-indigo-500" /> 
                Deploy OS
              </h1>
              <p className="text-xs text-slate-500 mt-2">SaaS 全栈落地指南 v4.1</p>
            </div>
          )}
          {isSidebarCollapsed && (
             <Rocket className="text-indigo-500" size={24} />
          )}

          {/* Desktop Collapse Toggle */}
          <button 
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="hidden md:block p-1.5 text-slate-500 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title={isSidebarCollapsed ? "展开侧边栏" : "收起侧边栏"}
          >
            {isSidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>
        
        {/* Sidebar Items */}
        <div className="flex-1 overflow-y-auto p-2 md:p-4 space-y-1 pt-20 md:pt-4 scrollbar-hide">
          {steps.map((step) => (
            <button
              key={step.id}
              onClick={() => handleStepChange(step.id)}
              className={`
                w-full flex items-center rounded-lg transition-all text-left group relative
                ${isSidebarCollapsed ? 'justify-center p-3' : 'p-3'}
                ${currentStep === step.id 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50' 
                  : 'hover:bg-slate-900 text-slate-400 hover:text-slate-200'}
              `}
            >
              <div className={`
                rounded-md shrink-0
                ${!isSidebarCollapsed && 'mr-3'}
                ${currentStep === step.id ? 'bg-indigo-500/50 p-1.5' : 'bg-slate-900 group-hover:bg-slate-800 p-1.5'}
              `}>
                <step.icon size={16} />
              </div>
              
              {!isSidebarCollapsed && (
                <div className="overflow-hidden">
                  <div className="text-sm font-semibold truncate">{step.title}</div>
                  <div className="text-[10px] opacity-60 truncate max-w-[140px]">{step.description}</div>
                </div>
              )}

              {!isSidebarCollapsed && currentStep === step.id && <ChevronRight size={14} className="ml-auto shrink-0" />}

              {/* Tooltip for Collapsed State */}
              {isSidebarCollapsed && (
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 border border-slate-700">
                  {step.title}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative bg-slate-900 w-full">
        <div className="h-1 bg-slate-800 w-full shrink-0">
           <div 
             className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
             style={{ width: `${((steps.findIndex(s => s.id === currentStep) + 1) / steps.length) * 100}%` }}
           />
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-12 scroll-smooth">
          <div className="max-w-5xl mx-auto">
            <StepContent />
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="p-4 md:p-6 border-t border-slate-800 bg-slate-950 flex justify-between items-center shrink-0 pb-8 md:pb-6 safe-area-pb">
          <button 
            disabled={currentStep === 'intro'}
            onClick={() => {
              const idx = steps.findIndex(s => s.id === currentStep);
              if (idx > 0) handleStepChange(steps[idx - 1].id);
            }}
            className="px-4 py-2 text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 text-sm font-medium flex items-center gap-2"
          >
            ← <span className="hidden md:inline">上一步</span>
          </button>
          
          <button 
            disabled={currentStep === 'advanced'}
            onClick={() => {
              const idx = steps.findIndex(s => s.id === currentStep);
              if (idx < steps.length - 1) handleStepChange(steps[idx + 1].id);
            }}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50 disabled:bg-slate-700 shadow-lg shadow-indigo-900/20"
          >
            <span className="hidden md:inline">下一步</span> <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

// --- 各步骤视图组件 ---

const IntroView = ({ setStep }: { setStep: (s: StepId) => void }) => (
  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="text-center space-y-4 mb-8 md:mb-12">
      <div className="inline-flex p-4 bg-indigo-500/10 rounded-full mb-4 ring-1 ring-indigo-500/30">
        <Laptop size={48} className="text-indigo-400" />
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-white">从 0 到 1：全栈 SaaS 落地指南</h2>
      <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
        欢迎来到 SaaS 开发的真实世界。本指南将带你从 Gemini 生成的单文件原型，进化为拥有前後端分离、数据库支持的现代化全栈应用。
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
      <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-indigo-500 transition-colors group">
        <div className="flex items-center gap-3 mb-4 text-indigo-400 group-hover:scale-110 transition-transform origin-left">
           <Layers size={24} />
           <h3 className="font-bold text-white text-lg">1. 理解架构</h3>
        </div>
        <p className="text-slate-400 text-sm">不只是复制代码，而是理解为什么我们要用 React, Vite 和 Tailwind。了解你的武器。</p>
      </div>

      <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-purple-500 transition-colors group">
        <div className="flex items-center gap-3 mb-4 text-purple-400 group-hover:scale-110 transition-transform origin-left">
           <Code2 size={24} />
           <h3 className="font-bold text-white text-lg">2. 本地构建</h3>
        </div>
        <p className="text-slate-400 text-sm">离开云端沙盒，在你的机器上搭建专业的开发环境。这是掌握代码控制权的第一步。</p>
      </div>

      <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-green-500 transition-colors group">
        <div className="flex items-center gap-3 mb-4 text-green-400 group-hover:scale-110 transition-transform origin-left">
           <Globe size={24} />
           <h3 className="font-bold text-white text-lg">3. 全栈部署</h3>
        </div>
        <p className="text-slate-400 text-sm">从前端静态页面，进化到拥有数据库的动态应用。学习 Vercel, Supabase 和 Render 的联动。</p>
      </div>
    </div>

    <div className="flex justify-center mt-12">
      <button 
        onClick={() => setStep('stack')}
        className="w-full md:w-auto px-8 py-4 bg-white text-indigo-900 rounded-xl font-bold text-lg hover:bg-indigo-50 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-3"
      >
        开始学习 <ArrowRight />
      </button>
    </div>
  </div>
);

const StackView = () => (
  <div className="space-y-8 animate-in fade-in duration-500">
    <Header title="1. 技术栈解密" subtitle="为什么我们选择这一套组合拳？" />
    
    <p className="text-slate-400">
      在开始之前，理解我们手中的工具至关重要。这是目前业界最流行、开发效率最高的 <strong>"现代 Web 开发栈" (Modern Web Stack)</strong>。
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      <StackCard 
        icon={Box} 
        color="text-cyan-400"
        title="React" 
        desc="用户界面库 (UI Library)"
        why="它把网页拆分成一个个独立的'组件'。就像乐高积木，你写好一个按钮，可以在任何地方复用。"
      />
      <StackCard 
        icon={CloudUpload} 
        color="text-yellow-400"
        title="Vite" 
        desc="构建工具 (Build Tool)"
        why="以前的工具太慢了。Vite (法语'快'的意思) 提供了极速的启动和热更新体验。"
      />
      <StackCard 
        icon={Code2} 
        color="text-sky-400"
        title="Tailwind CSS" 
        desc="原子化样式 (CSS)"
        why="不再需要写单独的 .css 文件。直接在 HTML 里写 `flex p-4`，所见即所得，开发速度提升 3 倍。"
      />
      <StackCard 
        icon={Database} 
        color="text-green-400"
        title="Supabase (未来)" 
        desc="后端即服务 (BaaS)"
        why="它是开源版的 Firebase。即使你不懂复杂的后端运维，也能在几分钟内拥有一个完整的数据库。"
      />
    </div>
  </div>
);

const EnvView = () => (
  <div className="space-y-6">
    <Header title="2. 工具准备" subtitle="工欲善其事，必先利其器" />
    
    <div className="grid grid-cols-1 gap-4 md:gap-6">
      <ChecklistItem 
        title="Node.js (运行时环境)" 
        cmd="node -v"
        desc="React 和 Vite 都依赖 Node.js 运行。它是这一整套技术栈的地基。"
        link="https://nodejs.org/"
        linkText="下载 LTS 版本"
      />
      <ChecklistItem 
        title="Git (版本控制)" 
        cmd="git --version"
        desc="后悔药 + 传送门。没有它，你不仅无法撤销错误代码，也无法将代码发送到云端服务器。"
        link="https://git-scm.com/downloads"
        linkText="下载 Git"
      />
      <ChecklistItem 
        title="Cursor / VS Code (编辑器)" 
        cmd={null}
        desc="你的武器。Cursor 内置了 AI，能帮你写代码、改 Bug、甚至解释报错信息，是新手的最佳拍档。"
        link="https://cursor.sh/"
        linkText="下载 Cursor"
      />
    </div>
  </div>
);

const InitView = () => {
  const [mode, setMode] = useState<'manual' | 'ai'>('manual');

  return (
    <div className="space-y-6">
      <Header title="3. 创建项目" subtitle="搭建你的数字基地" />
      
      <div className="flex p-1 bg-slate-950 rounded-lg w-full md:w-fit border border-slate-800 mb-6">
        <button 
          onClick={() => setMode('manual')}
          className={`flex-1 md:flex-none px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center justify-center gap-2 ${mode === 'manual' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
        >
          <Terminal size={14} /> 手动搭建 (稳)
        </button>
        <button 
          onClick={() => setMode('ai')}
          className={`flex-1 md:flex-none px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center justify-center gap-2 ${mode === 'ai' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
        >
          <Bot size={14} /> Cursor AI (快)
        </button>
      </div>

      {mode === 'manual' ? (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 md:p-6">
            <h3 className="font-bold text-slate-200 mb-4 flex items-center gap-2">
              <span className="bg-slate-800 text-slate-400 w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
              初始化 Vite 脚手架
            </h3>
            <CodeBlock code="npm create vite@latest client -- --template react-ts" />
            <div className="mt-4 p-3 bg-amber-900/20 border border-amber-900/50 rounded text-amber-200 text-xs">
              💡 <strong>架构思维：</strong> 我们把项目叫 <code>client</code>，是为了给未来预留 <code>server</code> 文件夹的位置，实现清晰的前后端分离架构。
            </div>
          </div>
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 md:p-6">
            <h3 className="font-bold text-slate-200 mb-4 flex items-center gap-2">
              <span className="bg-slate-800 text-slate-400 w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
              安装依赖
            </h3>
            <CodeBlock code="cd client && npm install" />
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-in fade-in duration-300">
           <div className="bg-indigo-900/10 border border-indigo-500/30 p-4 md:p-6 rounded-xl">
              <h3 className="text-lg font-bold text-indigo-300 mb-2 flex items-center gap-2">
                <Bot size={20} /> Cursor Composer 魔法
              </h3>
              <div className="space-y-4">
                <StepItem n="1" text="打开 Cursor，点击 File -> Open Folder，选择一个空文件夹。" />
                <StepItem n="2" text="按下 Cmd + I (Mac) 或 Ctrl + I (Win) 打开 Composer。" />
                <StepItem n="3" text="复制并输入以下提示词：" />
                <div className="bg-black p-3 rounded border border-slate-700 font-mono text-sm text-green-400 relative group">
                  <CopyButton text="帮我初始化一个 React + TypeScript 项目，使用 Vite 构建。项目文件夹命名为 'client'。同时帮我安装 TailwindCSS, lucide-react 库，并自动配置好 tailwind.config.js 和 index.css。" />
                  帮我初始化一个 React + TypeScript 项目... (点击复制)
                </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

const TailwindView = () => (
  <div className="space-y-6">
    <Header title="4. 样式配置" subtitle="让界面变好看的关键" />
    <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg flex gap-3 mb-6">
        <CheckCircle2 className="text-amber-500 shrink-0" size={20} />
        <p className="text-sm text-amber-200">
            如果你刚才用了 <strong>Cursor AI 模式</strong> 并且 AI 告诉你“配置已完成”，可跳过此步。
        </p>
    </div>
    <div className="space-y-6">
        <div className="border border-slate-800 rounded-xl overflow-hidden">
            <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 flex justify-between items-center">
                <span className="font-mono text-sm text-yellow-400">tailwind.config.js</span>
                <span className="text-xs text-slate-500">位于 client 文件夹</span>
            </div>
            <div className="p-4 bg-slate-900/50">
                <CodeBlock code={`export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`} />
            </div>
        </div>
        <div className="border border-slate-800 rounded-xl overflow-hidden">
            <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 flex justify-between items-center">
                <span className="font-mono text-sm text-blue-400">src/index.css</span>
                <span className="text-xs text-slate-500">位于 src 文件夹</span>
            </div>
            <div className="p-4 bg-slate-900/50">
                <p className="text-sm text-slate-400 mb-2">清空原内容，只保留：</p>
                <CodeBlock code={`@tailwind base;
@tailwind components;
@tailwind utilities;`} />
            </div>
        </div>
    </div>
  </div>
);

const MigrateView = () => (
  <div className="space-y-6">
    <Header title="5. 搬运代码" subtitle="灵魂注入" />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
            <h3 className="font-bold text-white mb-4">操作指南</h3>
            <div className="space-y-4 text-sm text-slate-400">
                <StepItem n="1" text="回到 Gemini 对话，复制 'ShadowOpOS.tsx' 的完整代码。" />
                <StepItem n="2" text="在本地打开 `client/src/App.tsx`。" />
                <StepItem n="3" text="全选并删除里面的所有原有代码。" />
                <StepItem n="4" text="粘贴 Gemini 生成的代码。" />
                <StepItem n="5" text="检查组件名：将 `export default function ShadowOpOS` 改为 `export default function App` 以匹配入口文件。" />
            </div>
        </div>
        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center">
            <div className="w-full max-w-xs space-y-2">
                <div className="flex items-center gap-2 text-slate-500 text-xs border-b border-slate-800 pb-2">
                   <FolderOpen size={14} /> client/src
                </div>
                <div className="pl-4 border-l border-slate-800 space-y-2">
                    <div className="flex items-center justify-between gap-2 text-indigo-400 text-sm bg-indigo-900/20 p-2 rounded border border-indigo-500/30">
                        <div className="flex items-center gap-2"><FileCode size={14} /> <strong>App.tsx</strong></div>
                        <span className="text-[10px] bg-indigo-600 text-white px-1.5 py-0.5 rounded">粘贴处</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 text-xs p-1"><FileCode size={14} /> main.tsx</div>
                    <div className="flex items-center gap-2 text-slate-500 text-xs p-1"><FileCode size={14} /> index.css</div>
                </div>
            </div>
        </div>
    </div>
  </div>
);

const GitView = () => (
  <div className="space-y-6">
    <Header title="6. 版本控制 (Git)" subtitle="连接云端的桥梁" />
    <div className="bg-indigo-900/20 border border-indigo-500/30 p-5 rounded-xl mb-6">
        <h3 className="text-indigo-300 font-bold mb-2 flex items-center gap-2">
            <Bot size={20} /> 核心原理
        </h3>
        <p className="text-slate-300 text-sm leading-relaxed">
            部署平台（如 Vercel）无法直接读取你电脑里的文件。你需要通过 Git 将代码“推”到一个公共仓库（GitHub），Vercel 会去那里“拉”取代码并构建网站。
        </p>
    </div>
    <div className="space-y-4">
        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
            <p className="text-slate-400 text-sm mb-2 font-semibold">Step 1: 本地存档</p>
            <CodeBlock code='git init && git add . && git commit -m "Initial commit"' />
        </div>
        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
            <p className="text-slate-400 text-sm mb-2 font-semibold">Step 2: 关联远程仓库</p>
            <p className="text-xs text-slate-500 mb-2">去 GitHub 创建新仓库后，复制它提供的 `git remote add` 命令并在终端运行。</p>
        </div>
        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
            <p className="text-slate-400 text-sm mb-2 font-semibold">Step 3: 推送上云</p>
            <CodeBlock code="git branch -M main && git push -u origin main" />
        </div>
    </div>
  </div>
);

const LaunchView = () => (
  <div className="space-y-6">
    <Header title="7. 本地测试" subtitle="Hello World" />
    <div className="flex flex-col items-center justify-center py-8 space-y-6">
        <div className="w-full max-w-md bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-2xl">
            <div className="bg-slate-900 px-4 py-2 text-xs text-slate-500 flex items-center gap-2 border-b border-slate-800">
                <Terminal size={12} /> Terminal
            </div>
            <div className="p-4 space-y-4 font-mono text-sm">
                <div><span className="text-green-500">➜</span> <span className="text-slate-300">cd client</span></div>
                <div><span className="text-green-500">➜</span> <span className="text-slate-300">npm run dev</span></div>
                <div className="pt-4 text-slate-400">
                    <div className="flex items-center gap-2">
                        <span>  ➜  Local:</span>
                        <a href="#" className="text-cyan-400 hover:underline">http://localhost:5173/</a>
                    </div>
                </div>
            </div>
        </div>
        <p className="text-slate-300 text-sm text-center">点击链接，确认网页运行无误。恭喜，前端部分大功告成！</p>
    </div>
  </div>
);

const BackendView = () => (
  <div className="space-y-8 animate-in fade-in duration-500">
    <Header title="8. 后端演进" subtitle="从静态网页到动态系统" />
    
    <div className="bg-slate-800/50 p-4 md:p-6 rounded-xl border border-slate-700">
        <h3 className="text-white font-bold text-lg mb-4">什么是全栈架构？</h3>
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between text-sm text-slate-400">
            <div className="bg-slate-950 p-4 rounded border border-slate-800 w-full text-center">
                <div className="text-indigo-400 font-bold mb-1">Frontend</div>
                <div className="text-xs">React</div>
            </div>
            <div className="flex flex-col items-center text-slate-600 rotate-90 md:rotate-0">
                <ArrowRight size={20} />
            </div>
            <div className="bg-slate-950 p-4 rounded border border-slate-800 w-full text-center">
                <div className="text-green-400 font-bold mb-1">Backend</div>
                <div className="text-xs">Node.js</div>
            </div>
            <div className="flex flex-col items-center text-slate-600 rotate-90 md:rotate-0">
                <ArrowRight size={20} />
            </div>
            <div className="bg-slate-950 p-4 rounded border border-slate-800 w-full text-center">
                <div className="text-yellow-400 font-bold mb-1">Database</div>
                <div className="text-xs">PostgreSQL</div>
            </div>
        </div>
    </div>

    <div className="space-y-4">
        <h4 className="text-white font-bold">如何开始后端？</h4>
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-sm text-slate-300 overflow-x-auto">
            <div className="flex gap-2"><FolderOpen size={16} className="text-slate-500"/> shadow-op-saas/ <span className="text-slate-600">// 根目录</span></div>
            <div className="pl-6 flex gap-2"><FolderOpen size={16} className="text-indigo-500"/> client/ <span className="text-slate-500">// 前端 (现有)</span></div>
            <div className="pl-6 flex gap-2"><FolderOpen size={16} className="text-green-500"/> server/ <span className="text-green-400">// 后端 (新建)</span></div>
            <div className="pl-12 text-slate-500">├── index.js  // 入口文件</div>
            <div className="pl-12 text-slate-500">├── .env      // 存放 API Key (绝密)</div>
            <div className="pl-12 text-slate-500">└── package.json</div>
        </div>
        <p className="text-slate-400 text-sm">
            你需要在根目录下新建 `server` 文件夹，并在其中运行 `npm init -y` 和 `npm install express cors dotenv` 来初始化后端项目。
        </p>
    </div>
  </div>
);

const DeployView = () => (
  <div className="space-y-8 animate-in fade-in duration-500">
    <Header title="9. 线上部署指南" subtitle="三步走：让全世界访问你的 SaaS" />
    
    {/* Troubleshooting Section */}
    <div className="bg-red-900/20 border border-red-500/30 p-4 md:p-6 rounded-xl">
        <div className="flex items-center gap-3 mb-4 text-red-400">
            <AlertTriangle size={24} />
            <h3 className="font-bold text-lg">常见报错与修复</h3>
        </div>
        <div className="space-y-4">
            <div className="bg-slate-950 p-4 rounded-lg border border-red-900/50">
                <div className="text-xs font-mono text-red-400 mb-2">Error: 'X' is declared but its value is never read.</div>
                <div className="flex gap-3 text-sm text-slate-400">
                    <Wrench size={16} className="text-indigo-400 mt-0.5 shrink-0" />
                    <div>
                        <strong>原因：</strong> Vercel 嚴格模式禁止未使用的變量。<br/>
                        <strong>修复：</strong> 刪除代碼中引入了但沒用到的圖標或變量（如 `Cpu`）。
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div className="space-y-6">
        {/* Frontend */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-2 h-full bg-indigo-500"></div>
            <h3 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
                <Globe className="text-indigo-400" /> 1. 前端上云 (Vercel)
            </h3>
            <ol className="list-decimal list-inside text-sm text-slate-300 space-y-2">
                <li>注册并登录 Vercel.com</li>
                <li>点击 <strong>Add New Project</strong>，导入你的 GitHub 仓库。</li>
                <li><strong className="text-amber-400">关键点：</strong>在 "Root Directory" 设置中，点击 Edit 并选择 <code>client</code> 文件夹。</li>
                <li>点击 <strong>Deploy</strong>。</li>
            </ol>
        </div>

        {/* Backend */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-2 h-full bg-green-500"></div>
            <h3 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
                <Server className="text-green-400" /> 2. 后端上云 (Render)
            </h3>
            <ol className="list-decimal list-inside text-sm text-slate-300 space-y-2">
                <li>注册 Render.com。</li>
                <li>点击 New &rarr; <strong>Web Service</strong>，连接 GitHub。</li>
                <li><strong className="text-amber-400">关键配置：</strong>
                    <ul className="pl-6 mt-1 space-y-1 text-slate-400 list-disc">
                        <li>Root Directory: <code>server</code></li>
                        <li>Build Command: <code>npm install</code></li>
                        <li>Start Command: <code>node index.js</code></li>
                    </ul>
                </li>
            </ol>
        </div>
    </div>
  </div>
);

const AdvancedView = () => (
  <div className="space-y-8 animate-in fade-in duration-500">
    <Header title="10. 进阶：分支与 CI/CD" subtitle="如何像大公司一样管理代码？" />
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Branching */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-900/20 rounded text-purple-400"><GitBranch size={24} /></div>
                <h3 className="font-bold text-white text-lg">分支 (Branches)</h3>
            </div>
            <div className="space-y-4 text-sm text-slate-400">
                <p>想象 Git 宇宙中的 <strong>"平行时空"</strong>。</p>
                <div className="bg-slate-900 p-4 rounded border border-slate-800 flex flex-col gap-4 relative overflow-hidden">
                    <div className="flex items-center gap-3 z-10">
                        <div className="w-4 h-4 rounded-full bg-green-500 z-10"></div>
                        <div className="flex-1">
                            <span className="text-green-400 font-mono font-bold">main</span>
                            <p className="text-xs opacity-60">主宇宙 (稳定版)</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 pl-8 z-10 relative">
                        <GitMerge className="text-slate-600 absolute left-2 top-[-10px] rotate-90" size={20} />
                        <div className="w-4 h-4 rounded-full bg-purple-500 z-10"></div>
                        <div className="flex-1">
                            <span className="text-purple-400 font-mono font-bold">dev</span>
                            <p className="text-xs opacity-60">实验宇宙 (开发版)</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* CI/CD (Mobile Optimized Visualization) */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-orange-900/20 rounded text-orange-400"><Workflow size={24} /></div>
                <h3 className="font-bold text-white text-lg">CI/CD 流水线</h3>
            </div>
            
            {/* Responsive Flex Direction: col on mobile, row on desktop */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 text-sm text-slate-400">
                <div className="flex items-center gap-3 bg-slate-900 p-3 rounded border border-slate-800 w-full md:w-auto">
                    <Laptop size={16} className="text-slate-500" />
                    <span>本地开发</span>
                </div>
                <ArrowRight size={16} className="rotate-90 md:rotate-0 self-center" />
                <div className="flex items-center gap-3 bg-slate-900 p-3 rounded border border-slate-800 w-full md:w-auto">
                    <Bot size={16} className="text-blue-400" />
                    <span>GitHub</span>
                </div>
                <ArrowRight size={16} className="rotate-90 md:rotate-0 self-center" />
                <div className="flex items-center gap-3 bg-slate-900 p-3 rounded border border-slate-800 w-full md:w-auto">
                    <Rocket size={16} className="text-green-400" />
                    <span>Vercel 上线</span>
                </div>
            </div>
        </div>
    </div>
  </div>
);

// --- 通用 UI 组件 ---

const Header = ({ title, subtitle }: { title: string, subtitle: string }) => (
  <div className="mb-6 md:mb-8 border-b border-slate-800 pb-4">
    <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
    <p className="text-indigo-400 mt-2 text-sm md:text-base">{subtitle}</p>
  </div>
);

const StackCard = ({ icon: Icon, color, title, desc, why }: any) => (
  <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl hover:border-indigo-500/30 transition-colors group">
    <div className={`flex items-center gap-3 mb-3 ${color}`}>
      <Icon size={24} className="group-hover:scale-110 transition-transform" />
      <h3 className="font-bold text-white text-lg">{title}</h3>
    </div>
    <div className="text-xs font-mono text-slate-500 mb-3 bg-slate-900 w-fit px-2 py-1 rounded">{desc}</div>
    <p className="text-slate-400 text-sm leading-relaxed">{why}</p>
  </div>
);

const CodeBlock = ({ code }: { code: string }) => (
  <div className="relative group bg-slate-950 rounded-lg border border-slate-800 font-mono text-sm overflow-hidden shadow-inner">
    <div className="flex justify-between items-center px-4 py-2 bg-slate-900/50 border-b border-slate-800">
      <div className="flex gap-1.5 opacity-50">
        <div className="w-2.5 h-2.5 rounded-full bg-slate-600"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-slate-600"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-slate-600"></div>
      </div>
      <CopyButton text={code} />
    </div>
    <div className="p-4 overflow-x-auto text-slate-300 whitespace-pre">
      {code}
    </div>
  </div>
);

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      try {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        if (successful) {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }
      } catch (fallbackErr) {
        console.error('Fallback failed', fallbackErr);
      }
    }
  };

  return (
    <button 
      onClick={handleCopy}
      className="text-slate-500 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded hover:bg-slate-800"
    >
      {copied ? <CheckCircle2 size={14} className="text-green-500" /> : <Copy size={14} />}
      {copied ? '已复制' : '复制'}
    </button>
  );
};

const ChecklistItem = ({ title, cmd, desc, link, linkText }: any) => (
  <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl flex flex-col md:flex-row gap-4 items-start group hover:border-indigo-500/30 transition-colors">
     <div className="mt-1 text-indigo-500 shrink-0">
        <CheckSquare size={20} />
     </div>
     <div className="flex-1 w-full">
        <h4 className="font-bold text-slate-200 text-base mb-1">{title}</h4>
        <p className="text-slate-400 text-sm mb-3 leading-relaxed">{desc}</p>
        
        {cmd && (
            <div className="bg-black/50 rounded px-3 py-2 font-mono text-xs text-green-400 w-full md:w-fit mb-3 border border-slate-800 overflow-x-auto">
                &gt; {cmd}
            </div>
        )}
        
        {link && (
            <a href={link} target="_blank" className="text-indigo-400 text-xs hover:text-indigo-300 hover:underline flex items-center gap-1">
                {linkText} <ArrowRight size={10} />
            </a>
        )}
     </div>
  </div>
);

const StepItem = ({ n, text }: { n: string, text: string }) => (
    <div className="flex gap-3 items-start">
        <span className="bg-indigo-600 text-white w-5 h-5 rounded-full flex items-center justify-center shrink-0 font-bold text-[10px] mt-0.5">{n}</span>
        <p className="text-sm text-slate-300 leading-relaxed">{text}</p>
    </div>
);