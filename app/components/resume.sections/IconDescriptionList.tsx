import type { IconComponent } from "~/components/icons";
import { Icon } from "~/components/icons";
import type { PropsWithChildren } from "react";
import classNames from "classnames";

function RowDivWrapper({
  children,
  className,
  ...props
}: PropsWithChildren<JSX.IntrinsicElements["div"]>) {
  return (
    <div className={classNames("flex flex-row gap-2", className)} {...props}>
      {children}
    </div>
  );
}

function IconTerm({
  icon: GivenIcon,
  className,
  ...props
}: { icon: IconComponent | string } & JSX.IntrinsicElements["dt"]) {
  return (
    <dt
      className={classNames("flex flex-col justify-center", className)}
      {...props}
    >
      {typeof GivenIcon === "string" ? (
        <Icon name={GivenIcon} />
      ) : (
        <GivenIcon />
      )}
    </dt>
  );
}

export type Item = {
  name: string;
  icon: string | IconComponent;
  description: JSX.Element;
  className?: string;
};
export default function IconDescriptionList({ items }: { items: Item[] }) {
  return (
    <dl className="flex flex-col flex-wrap  justify-start gap-2 md:gap-3">
      {items.map(({ name, icon, description, className }) => (
        <RowDivWrapper key={name} className={className}>
          <IconTerm aria-label={name} icon={icon} className="h-6 w-6" />
          <dd>{description}</dd>
        </RowDivWrapper>
      ))}
    </dl>
  );
}
