var traverseDomAndCollectElements = function (matchFunc, startEl) {
  var resultSet = [];

  if (typeof startEl === "undefined") {
    startEl = document.body;
  }

  function traverse(el, matchFunc, isDirectChild) {
    if (matchFunc(el)) {
      resultSet.push(el);
    }

    var children = el.children;
    for (var i = 0; i < children.length; i++) {
      if (isDirectChild) {
        traverse(children[i], matchFunc, true);
      } else {
        traverse(children[i], matchFunc, false);
      }
    }
  }

  traverse(startEl, matchFunc, false);

  return resultSet;
};

var traverseWithCombinator = function (el, matchFunc, combinator) {
  var children = el.children;
  for (var i = 0; i < children.length; i++) {
    var child = children[i];
    if (combinator === ">") {
      if (matchFunc(child)) {
        resultSet.push(child);
      }
    } else {
      if (matchFunc(child)) {
        resultSet.push(child);
      }
      traverseWithCombinator(child, matchFunc, combinator);
    }
  }
};

var $ = function (selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);

  var combinator = "";
  if (selector.includes(">")) {
    combinator = ">";
    selector = selector.slice(selector.indexOf(">") + 1).trim();
  } else if (selector.includes(" ")) {
    combinator = " ";
    selector = selector.slice(selector.indexOf(" ") + 1).trim();
  }

  var resultSet = [];
  var rootElements = traverseDomAndCollectElements(selectorMatchFunc);

  for (var i = 0; i < rootElements.length; i++) {
    var rootElement = rootElements[i];
    if (combinator !== "") {
      traverseWithCombinator(rootElement, selectorMatchFunc, combinator);
    } else {
      resultSet.push(rootElement);
    }
  }

  elements = resultSet;
  return elements;
};

var selectorTypeMatcher = function (selector) {
  if (selector.includes("#")) {
    return "id";
  } else if (selector.includes(".")) {
    if (selector.indexOf(".") !== 0) { // Verificar si el punto no está al principio
      return "tag.class";
    } else {
      return "class";
    }
  } else {
    return "tag";
  }
};

// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.

const matchFunctionMaker = (selector) => {
  const selectorType = selectorTypeMatcher(selector);

  if (selectorType === "id") {
    const targetId = selector.slice(1); // Eliminar el primer carácter (#)
    return (el) => el.id === targetId;
  } else if (selectorType === "class") {
    const targetClass = selector.slice(1); // Eliminar el primer carácter (.)
    return (el) => el.classList.contains(targetClass);
  } else if (selectorType === "tag.class") {
    const [tag, className] = selector.split(".");
    return (el) => el.tagName.toLowerCase() === tag && el.classList.contains(className);
  } else if (selectorType === "tag") {
    return (el) => el.tagName.toLowerCase() === selector.toLowerCase();
  }
};