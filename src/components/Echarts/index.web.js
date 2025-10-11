import React, { useMemo } from 'react';
import { View } from 'react-native';
import renderChart from 'native-echarts/src/components/Echarts/renderChart';
import html from '!!raw-loader!./tpl.html';

const EchartsWeb = (props) => {
  const { height = 400, backgroundColor = 'transparent', ...rest } = props;
  const srcDoc = useMemo(() => {
    const injectedJavaScript = renderChart(props);
    return `${html}<script>${injectedJavaScript}</script>`;
  }, [props]);

  return (
    <View style={{ flex: 1, height }}>
      <iframe
        srcDoc={srcDoc}
        style={{
          width: '100%',
          height,
          border: 'none',
          backgroundColor,
        }}
      />
    </View>
  );
};

export default EchartsWeb;