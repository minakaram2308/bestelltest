import { Avatar as ArkAvatar } from "@ark-ui/react/avatar";
import { AvatarImage } from "./AvatarImage";
import { AvatarRoot, type AvatarRootProps } from "./AvatarRoot";

interface Props extends AvatarRootProps {
  src: string;
  fallback?: string;
}

export const Avatar = ({ src, fallback, ...rest }: Props) => {
  return (
    <AvatarRoot {...rest}>
      {fallback && <ArkAvatar.Fallback>{fallback}</ArkAvatar.Fallback>}
      <AvatarImage src={src} />
    </AvatarRoot>
  );
};
