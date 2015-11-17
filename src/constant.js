export default function(x) {
  return function() {
    return x;
  };
};

export function constantTrue() {
  return true;
};

export function constantZero() {
  return 0;
};
