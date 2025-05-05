import { AnimatePresence, motion } from "framer-motion";

const ANIMATION_CONFIG = {
  duration: 0.3,
  ease: "easeInOut",
} as const;

const CONTACTS_BG_STYLE = { backgroundColor: "rgba(200, 197, 209, 0.3)" } as const;

interface ModalBodyProps {
  inputs: React.ReactNode;
  contacts: React.ReactNode;
  hasContacts: boolean;
  addContact: React.ReactNode;
  error: string;
}

const ModalBody: React.FC<ModalBodyProps> = ({
  inputs,
  contacts,
  hasContacts,
  addContact,
  error,
}) => {
  return (
    <>
      <div className="px-7 pb-2">
        <div className="mt-4">{inputs}</div>
      </div>
      <div style={CONTACTS_BG_STYLE} className="relative">
        <motion.div
          className="relative"
          initial={false}
          animate={{
            height: hasContacts ? "auto" : 0,
            opacity: hasContacts ? 1 : 0,
          }}
          transition={ANIMATION_CONFIG}
        >
          <AnimatePresence initial={false}>{contacts}</AnimatePresence>
        </motion.div>

        <motion.div
          animate={{
            paddingBottom: hasContacts ? "15px" : "0",
          }}
          transition={ANIMATION_CONFIG}
        >
          {addContact}
        </motion.div>
      </div>

      {error && (
        <div className={`text-center ${error ? "pt-5 px-5" : "pt-0"}`}>
          {error.split("\n").map((msg, index) => (
            <p className="text-red text-[13px]" key={index}>
              {msg}
            </p>
          ))}
        </div>
      )}
    </>
  );
};

export default ModalBody;
