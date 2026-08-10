import{j as e}from"./jsx-runtime-DFAAy_2V.js";import{r as x}from"./index-Bc2G9s8g.js";import{M as g,c as m,d as f}from"./mockSdk-Dn71j6KJ.js";const y=({defaultQuery:s,perPage:c})=>{const[i,p]=x.useState(s),{data:r,isLoading:a,error:o}=f(i,1,c);return e.jsxs("div",{children:[e.jsx("div",{style:{margin:"0 0 20px 0"},children:e.jsx("input",{type:"text",placeholder:"Type to search (e.g. Mountain, Forest, Ocean)...",value:i,onChange:t=>p(t.target.value),style:{padding:"10px 16px",fontSize:"1rem",borderRadius:"8px",border:"1px solid #ccc",width:"100%",maxWidth:"500px",boxSizing:"border-box",outline:"none",fontFamily:"inherit"}})}),a&&e.jsx("div",{className:"grid-container",children:Array.from({length:c}).map((t,u)=>e.jsx("div",{className:"skeleton",style:{height:"240px",borderRadius:"12px"}},u))}),o&&e.jsxs("div",{style:{padding:"24px",background:"rgba(239, 68, 68, 0.1)",color:"#ef4444",borderRadius:"8px"},children:["Error: ",o.message]}),!a&&!o&&(r==null?void 0:r.items.length)===0&&e.jsxs("div",{style:{padding:"24px",textAlign:"center",color:"#666"},children:['No photos found matching "',i,'"']}),!a&&!o&&((r==null?void 0:r.items.length)??0)>0&&e.jsx("div",{className:"grid-container",children:r==null?void 0:r.items.map(t=>e.jsxs("div",{className:"grid-item",children:[e.jsx("img",{src:t.previewUrl,alt:t.title,style:{width:"100%",height:"200px",objectFit:"cover",display:"block"}}),e.jsxs("div",{className:"grid-item-info",children:[e.jsx("h3",{children:t.title}),e.jsxs("p",{children:["by ",t.photographer]})]})]},t.id))})]})},v={title:"React SDK/useSearchPhotos",decorators:[s=>e.jsx(g,{sdk:m(),children:e.jsxs("div",{style:{padding:"24px",background:"#fff",color:"#000",minHeight:"400px"},children:[e.jsx("h2",{style:{margin:"0 0 8px 0",fontSize:"1.5rem",fontWeight:700},children:"Search Photos Interface"}),e.jsxs("p",{style:{margin:"0 0 24px 0",color:"#666",fontSize:"0.9rem"},children:["Demonstrates searching photos using the ",e.jsx("code",{children:"useSearchPhotos"})," hook."]}),e.jsx(s,{})]})})],tags:["autodocs"]},n={render:s=>e.jsx(y,{defaultQuery:s.defaultQuery,perPage:s.perPage}),args:{defaultQuery:"Mountain",perPage:3},argTypes:{defaultQuery:{control:"text",description:"The initial query string for search operations."},perPage:{control:{type:"number",min:1,max:4},description:"The maximum results count to fetch."}}};var d,l,h;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: (args: SearchPhotosProps) => <SearchPhotosDemo defaultQuery={args.defaultQuery} perPage={args.perPage} />,
  args: {
    defaultQuery: 'Mountain',
    perPage: 3
  },
  argTypes: {
    defaultQuery: {
      control: 'text',
      description: 'The initial query string for search operations.'
    },
    perPage: {
      control: {
        type: 'number',
        min: 1,
        max: 4
      },
      description: 'The maximum results count to fetch.'
    }
  }
}`,...(h=(l=n.parameters)==null?void 0:l.docs)==null?void 0:h.source}}};const S=["Default"];export{n as Default,S as __namedExportsOrder,v as default};
