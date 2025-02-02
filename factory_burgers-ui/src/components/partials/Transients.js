import React, { useMemo, useState } from "react";

import PropTypes from "prop-types";

import Form from "react-bootstrap/Form";

import TransientRow from "./TransientRow";

import { attributesShape } from "lib/shapes";

function attrDiff(a, b) {
  const bNames = new Set(b.map(item => item.name));
  return a.filter(item => !bNames.has(item.name));
}

function Traits(props) {
  const { attributes } = props;

  const [inputAttributes, setInputAttributes] = useState([]);
  const remainingAttributes = useMemo(() => attrDiff(attributes, inputAttributes), [attributes, inputAttributes]);

  const remainingAttributeOptions = remainingAttributes.map(attr => (
    <option key={attr.name} value={attr.name}>{attr.name}</option>
  ));

  function addAttribute({name, value}) {
    setInputAttributes([...inputAttributes, {name, value}]);
  }

  function setAttributeName(ii, event) {
    const replacement = {name: event.target.value, value: inputAttributes[ii].value};
    replaceAttribute(ii, replacement);
  }

  function setAttributeValue(ii, event) {
    const replacement = {name: inputAttributes[ii].name, value: event.target.value};
    replaceAttribute(ii, replacement);
  }

  function replaceAttribute(ii, replacement) {
    const newAttributes = inputAttributes.slice();
    newAttributes.splice(ii, 1, replacement);
    setInputAttributes(newAttributes);
  }

  return (
    <Form.Group controlId="factories.Traits">
      <Form.Label>Ketchup or bbq sauce?</Form.Label>

      {inputAttributes.map((attr, ii) => (
        <TransientRow
          key={ii}
          attribute={attr}
          disabled={props.disabled}
          onChangeName={event => setAttributeName(ii, event)}
          onChangeValue={event => setAttributeValue(ii, event)}
        >
          {remainingAttributeOptions}
        </TransientRow>
      ))}

      <TransientRow
        key={inputAttributes.length + 1}
        attribute={{name: "", value: ""}}
        disabled={props.disabled}
        onChangeName={event => addAttribute({name: event.target.value, value: ""})}
        onChangeValue={event => addAttribute({name: "", value: event.target.value})}
      >
        {remainingAttributeOptions}
      </TransientRow>

    </Form.Group>
  );
}

Traits.propTypes = {
  disabled: PropTypes.bool,
  attributes: PropTypes.arrayOf(attributesShape).isRequired,
};

export default Traits;
