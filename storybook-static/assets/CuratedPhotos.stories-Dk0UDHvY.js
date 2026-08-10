import{j as e}from"./jsx-runtime-DFAAy_2V.js";import{M as l,c as m,u as h}from"./mockSdk-Dn71j6KJ.js";import"./index-Bc2G9s8g.js";const x=({page:r,perPage:o})=>{const{data:t,isLoading:c,error:n}=h(r,o);return c?e.jsx("div",{className:"grid-container",style:{padding:"20px 0"},children:Array.from({length:o}).map((s,g)=>e.jsx("div",{className:"skeleton",style:{height:"240px",borderRadius:"12px"}},g))}):n?e.jsxs("div",{style:{padding:"24px",background:"rgba(239, 68, 68, 0.1)",color:"#ef4444",borderRadius:"8px"},children:["Failed to load: ",n.message]}):e.jsx("div",{className:"grid-container",style:{padding:"20px 0"},children:t==null?void 0:t.items.map(s=>e.jsxs("div",{className:"grid-item",children:[e.jsx("img",{src:s.previewUrl,alt:s.title,style:{width:"100%",height:"200px",objectFit:"cover",display:"block"}}),e.jsxs("div",{className:"grid-item-info",children:[e.jsx("h3",{children:s.title}),e.jsxs("p",{children:["by ",s.photographer]})]})]},s.id))})},y={title:"React SDK/useCuratedPhotos",decorators:[r=>e.jsx(l,{sdk:m(),children:e.jsxs("div",{style:{padding:"24px",background:"#fff",color:"#000",minHeight:"400px"},children:[e.jsx("h2",{style:{margin:"0 0 8px 0",fontSize:"1.5rem",fontWeight:700},children:"Curated Photos Feed"}),e.jsxs("p",{style:{margin:"0 0 24px 0",color:"#666",fontSize:"0.9rem"},children:["Displays photos loaded via the ",e.jsx("code",{children:"useCuratedPhotos"})," hook."]}),e.jsx(r,{})]})})],tags:["autodocs"]},a={render:r=>e.jsx(x,{page:r.page,perPage:r.perPage}),args:{page:1,perPage:3},argTypes:{page:{control:{type:"number",min:1},description:"The pagination page index to request."},perPage:{control:{type:"number",min:1,max:4},description:"The number of media elements to show per page."}}};var i,d,p;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:`{
  render: (args: CuratedPhotosProps) => <CuratedPhotosList page={args.page} perPage={args.perPage} />,
  args: {
    page: 1,
    perPage: 3
  },
  argTypes: {
    page: {
      control: {
        type: 'number',
        min: 1
      },
      description: 'The pagination page index to request.'
    },
    perPage: {
      control: {
        type: 'number',
        min: 1,
        max: 4
      },
      description: 'The number of media elements to show per page.'
    }
  }
}`,...(p=(d=a.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};const P=["Default"];export{a as Default,P as __namedExportsOrder,y as default};
