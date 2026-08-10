import{j as e}from"./jsx-runtime-DFAAy_2V.js";import{M as m,c as d,a as u}from"./mockSdk-Dn71j6KJ.js";import"./index-Bc2G9s8g.js";const p=()=>{const l=u();return e.jsxs("div",{style:{padding:"24px",borderRadius:"12px",background:"rgba(255, 255, 255, 0.05)",border:"1px solid rgba(255, 255, 255, 0.1)",maxWidth:"400px"},children:[e.jsx("h3",{style:{margin:"0 0 16px 0",fontSize:"1.25rem",fontWeight:600},children:"SDK Active Context"}),e.jsxs("p",{style:{margin:"8px 0",fontSize:"0.9rem"},children:[e.jsx("strong",{children:"Mock API Key:"})," ",e.jsx("code",{children:l.getApiKey()})]}),e.jsxs("p",{style:{margin:"8px 0",fontSize:"0.9rem"},children:[e.jsx("strong",{children:"Status:"})," ",e.jsx("span",{style:{color:"#10b981",fontWeight:600},children:"Initialized"})]})]})},D={title:"React SDK/MediaProvider",component:m,tags:["autodocs"],argTypes:{sdk:{control:!1,description:"The instantiated MediaCore SDK instance."},children:{control:!1,description:"React child components that consume the SDK context."}}},t={args:{sdk:d(),children:e.jsx(p,{})},parameters:{docs:{description:{story:"Default example of the `MediaProvider` wrapping components to supply the headless SDK context."}}}},s={args:{sdk:new class extends d().constructor{getApiKey(){return"custom-pexels-token-999"}},children:e.jsx(p,{})},parameters:{docs:{description:{story:"Demonstrates provider encapsulation using an SDK instance configured with a custom API token."}}}};var n,r,o;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    sdk: createMockSDK(),
    children: <SDKContextInspector />
  },
  parameters: {
    docs: {
      description: {
        story: 'Default example of the \`MediaProvider\` wrapping components to supply the headless SDK context.'
      }
    }
  }
}`,...(o=(r=t.parameters)==null?void 0:r.docs)==null?void 0:o.source}}};var a,c,i;s.parameters={...s.parameters,docs:{...(a=s.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {
    sdk: new class extends createMockSDK().constructor {
      override getApiKey() {
        return 'custom-pexels-token-999';
      }
    }(),
    children: <SDKContextInspector />
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates provider encapsulation using an SDK instance configured with a custom API token.'
      }
    }
  }
}`,...(i=(c=s.parameters)==null?void 0:c.docs)==null?void 0:i.source}}};const K=["Default","CustomAPIKey"];export{s as CustomAPIKey,t as Default,K as __namedExportsOrder,D as default};
