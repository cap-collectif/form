import { useState, FC } from 'react';
import {
    Uploader as CapUploader,
    UploaderProps as CapUploaderProps,
    InfoMessage,
    FileList,
} from '@cap-collectif/ui';
import { useIntl } from 'react-intl';
import {
    ApiFileInfo,
    handleErrors,
    handleWarning,
    UploaderError,
    UploaderWarning,
    uploadFiles,
} from './Uploader.utils';

type UploaderValue = ApiFileInfo[];

export interface UploaderProps
    extends Omit<CapUploaderProps, 'wording' | 'isInvalid' | 'isRequired' | 'onDrop'> {
    onDrop?: CapUploaderProps['onDrop'];
    uploadURI?: string;
}

export enum ErrorCode {
    FileInvalidType = 'file-invalid-type',
    FileTooLarge = 'file-too-large',
    FileTooSmall = 'file-too-small',
    TooManyFiles = 'too-many-files',
}

export const Uploader: FC<UploaderProps> = ({
    onDrop,
    onDropRejected,
    uploadURI,
    multiple = false,
    maxSize = 10000000,
    ...props
}) => {
    const intl = useIntl();
    const [error, setError] = useState<UploaderError>([]);
    const [warning, setWarning] = useState<UploaderWarning>(null);
    const [files, setFiles] = useState<UploaderValue>([]);

    const wordingUploader = {
        uploaderPrompt: intl.formatMessage({ id: 'uploader-prompt' }, { count: multiple ? 2 : 1 }),
        uploaderLoadingPrompt: intl.formatMessage({ id: 'page-media-add--loading' }),
        fileDeleteLabel: intl.formatMessage({ id: 'action_delete' }),
    };

    const resetWarningAndError = () => {
        setError(null);
        setWarning(null);
    };

    return (
        <>
            <CapUploader
                wording={wordingUploader}
                onDrop={async (...args) => {
                    handleWarning(args[0], setWarning, intl, props.minResolution);

                    if (uploadURI) {
                        const filesUploaded = await uploadFiles(args[0], uploadURI);
                        setFiles(filesUploaded);
                    }

                    if (error || warning) resetWarningAndError();

                    if (onDrop) onDrop(...args);
                }}
                value={files}
                onDropRejected={(filesRejected, event) => {
                    if (maxSize || props.format) {
                        handleErrors(filesRejected, setError, multiple, intl, {
                            maxSize,
                            format: props.format,
                        });
                    }

                    if (onDropRejected) onDropRejected(filesRejected, event);
                }}
                multiple={multiple}
                maxSize={maxSize}
                {...props}
            />

            {warning && (
                <InfoMessage variant="warning">
                    <InfoMessage.Title>{warning}</InfoMessage.Title>
                </InfoMessage>
            )}

            {Array.isArray(error) && error.length > 0 && (
                <InfoMessage variant="danger">
                    <InfoMessage.Title>
                        {intl.formatMessage({ id: 'uploader.rejected.list.title' })}
                    </InfoMessage.Title>
                    {error.map((error, idx) => (
                        <InfoMessage.Content color="red.900" key={`error-${idx}`}>
                            {error}
                        </InfoMessage.Content>
                    ))}
                </InfoMessage>
            )}

            {!Array.isArray(error) && error && (
                <InfoMessage variant="danger">
                    <InfoMessage.Title>{error}</InfoMessage.Title>
                </InfoMessage>
            )}

            {multiple && files.length > 0 && (
                <FileList
                    files={files}
                    deleteFileLabel={intl.formatMessage({ id: 'action_delete' })}
                    onRemove={fileDeleted => {
                        const filesUpdated = files.filter(file => file.id !== fileDeleted.id);
                        setFiles(filesUpdated);
                    }}
                />
            )}
        </>
    );
};

export default Uploader;
