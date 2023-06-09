import { createRenderer } from "solid-js/universal";

const PROPERTIES = new Set(["className", "textContent"]);

type RendererType = HTMLElement | Element | Text | ParentNode | ChildNode;

const isWritable = <T extends Object>(obj: T, key: keyof T): boolean => {
  const descriptor = Object.getOwnPropertyDescriptor(obj, key);
;
  return Boolean(descriptor?.writable);
}

export const {
  render,
  effect,
  memo,
  createComponent,
  createElement,
  createTextNode,
  insertNode,
  insert,
  spread,
  setProp,
  mergeProps
} = createRenderer<RendererType>({
  createElement(string) {
    return document.createElement(string);
  },

  createTextNode(value: string) {
    return document.createTextNode(value);
  },

  replaceText(textNode: Text, value: string) {
    textNode.data = value;
  },

  setProperty<T>(node: HTMLElement, name: string, value: T) {
    if (!node) {
      return;
    }

    if (name === "style") {
      Object.assign(node.style, value);
    } else if (name.startsWith("on")) {
      const key = name.toLowerCase() as keyof typeof node;

      // filter readonly properties
      if (isWritable(node, key)) {
        // @ts-ignore
        node[key] = value; // could also be (node as any)[key] = value;
      }
    } else if (PROPERTIES.has(name)) {
      const key = name as keyof typeof node;

      // filter readonly properties
      if (isWritable(node, key)) {
        // @ts-ignore
        node[key] = value; // could also be (node as any)[key] = value;
      }
    } else {
      node.setAttribute(name, value as string);
    }
  },

  insertNode(parent, node, anchor) {
    if (!anchor) {
      return;
    }

    parent.insertBefore(node, anchor);
  },

  isTextNode(node) {
    return node.nodeType === 3;
  },

  removeNode(parent, node) {
    parent.removeChild(node);
  },

  getParentNode(node) {
    if (!node?.parentNode) {
      return undefined;
    }

    return node.parentNode;
  },

  getFirstChild(node) {
    if (!node?.firstChild) {
      return undefined;
    }

    return node.firstChild;
  },

  getNextSibling(node) {
    if (!node?.nextSibling) {
      return undefined;
    }

    return node.nextSibling;
  }
});

// Forward Solid control flow
export {
  For,
  Show,
  Suspense,
  SuspenseList,
  Switch,
  Match,
  Index,
  ErrorBoundary
} from "solid-js";