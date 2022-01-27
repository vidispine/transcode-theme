import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

const styles = (theme) => ({
  root: {},
  labelKey: {
    color: theme.palette.primary.main,
  },
  labelValue: {
    color: theme.palette.success.main,
  },
});

const LabelComponent = withStyles(styles)(({ classes, nodeKey, nodeValue }) => {
  return typeof nodeValue === 'object' ? (
    <span className={classes.labelKey}>{nodeKey}</span>
  ) : (
    <>
      <span className={classes.labelKey}>{`${nodeKey}: `}</span>
      <span className={classes.labelValue}>{nodeValue}</span>
    </>
  );
});

const JsonTreeView = ({ classes, data }) => {
  const renderNodes = (nodes, prevKey = 'root') =>
    Array.isArray(nodes)
      ? nodes.map((node, index) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <TreeItem key={`${prevKey}${index}`} nodeId={`${prevKey}${index}`} label={index}>
              {typeof node === 'object' ? renderNodes(node, `${prevKey}${index}`) : null}
            </TreeItem>
          );
        })
      : Object.entries(nodes).map(([key, value]) => {
          return (
            <TreeItem
              key={`${prevKey}${key}`}
              nodeId={`${prevKey}${key}`}
              label={<LabelComponent nodeKey={key} nodeValue={value} />}
            >
              {typeof value === 'object' ? renderNodes(value, `${prevKey}${key}`) : null}
            </TreeItem>
          );
        });

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {renderNodes(data)}
    </TreeView>
  );
};

export default withStyles(styles)(JsonTreeView);
