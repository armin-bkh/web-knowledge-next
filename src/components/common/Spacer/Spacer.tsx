export interface ISpacerProps {
  times?: number;
}

const Spacer = ({ times = 1 }: ISpacerProps) => (
  <div style={{ width: times * 8, height: times * 8 }}></div>
);

export default Spacer;
