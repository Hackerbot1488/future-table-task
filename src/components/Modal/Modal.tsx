import React, { MouseEvent } from "react";
import "./Modal.css";
import { Portal } from "../Portal/Portal";
interface ModalProps {
	title?: string;
	isOpen?: boolean;
	onCancel?: () => void;
	onSubmit?: () => void;
}
export const Modal: React.FC<ModalProps> = ({
	title,
	isOpen,
	onSubmit,
	onCancel,
	children,
}) => {
	return (
		<>
			{isOpen && (
				<Portal>
					<div
						className="modalOverlay"
						onClick={(e: MouseEvent<HTMLDivElement>) =>
							(e.target as HTMLElement).classList.contains("modalOverlay") &&
							onCancel!()
						}
					>
						<div className="modalWindow">
							<div className="modalHeader">
								<div className="modalTitle">{title}</div>
								<button className="modalButton closeButton" onClick={onCancel}>
									&times;
								</button>
							</div>
							<div className="modalBody">{children}</div>
							<div className="modalFooter">
								<button className="modalButton" onClick={onCancel}>
									Cancel
								</button>
								<button className="modalButton" onClick={onSubmit}>
									Submit
								</button>
							</div>
						</div>
					</div>
				</Portal>
			)}
		</>
	);
};
Modal.defaultProps = {
	onCancel: () => {},
	onSubmit: () => {},
	title: "Modal title",
	isOpen: false,
};
