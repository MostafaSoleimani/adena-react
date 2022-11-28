export default function getFormObj(formLayout) {
  return formLayout.layout.reduce((preTab, curTab) => {
    return {
      ...preTab,
      [curTab.name]: curTab.data.children.reduce(
        (preContainer, curContainer) => {
          return {
            ...preContainer,
            [curContainer.name]: curContainer.data.children.reduce(
              (preField, curField) => {
                return {
                  ...preField,
                  [curField.name]: curField.data.default,
                };
              },
              {}
            ),
          };
        },
        {}
      ),
    };
  }, {});
}
